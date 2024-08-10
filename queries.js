// Добавление данных для манипулирования
db.car.insertMany([
    { regNum: "a111aa", type: "грузовая", brand: "Пробная 1", places: [
        {
            place_id: ObjectId('65cf307806de048d0034c678'),
            arrival: ISODate("2023-02-13T06:31:15Z"), 
            departure: ISODate("2023-02-14T08:25:53Z")
        }
    ]},
    { regNum: "б222бб", type: "грузовая", brand: "Пробная 2", places: [
        {
            place_id: ObjectId('65cf307806de048d0034c67a'),
            arrival: ISODate("2023-02-23T12:45:16Z"), 
            departure: ISODate("2023-02-24T16:02:50Z")
        }
    ]}
]);

// Добавление данных в коллекцию street
db.street.insertMany([
    { streetName: "ул. Первая Пробная" },
    { streetName: "ул. Вторая Пробная" },
]);

// Обновление документа коллекции верхнего уровня
db.street.updateOne({ streetName: "ул. Первая Пробная" }, { $set: { streetName: "Новое первая пробная" } });

// Обновление вложенного документа
db.car.update(
    { regNum: "б222бб", "places.place_id": ObjectId('65cf307806de048d0034c67a') },
    { $set: { "places.$.arrival": new ISODate("2023-02-19T13:45:16.000+00:00") } }
);

// Удаление документа коллекции верхнего уровня
db.street.deleteOne({ streetName: "ул. Вторая Пробная" });

// Удаление вложенного документа (добавь владельцу машину)
db.owner.updateOne({}, { $pull: { cars: { _id: ObjectId("65e364dc083107e3912413dc") } } });

// Запрос на поиск подстроки: все парковки, расположенные на линиях (улица в адресе содержит «линия»)
db.parking.aggregate([
    {
        $lookup: {
            from: "street",
            localField: "idStreet",
            foreignField: "_id",
            as: "street_info"
        }
    },
    {
        $match: {
            "street_info.streetName": { $regex: /линия/i }
        }
    },
    {
        $project: {
            "parking_id": "$_id",
            "street_name": "$street_info.streetName",
        }
    }
]);

// Запрос на использование одного документа несколько раз: владелец машины, у которого есть машины разных типов
db.owner.aggregate([
    {
        $lookup: {
            from: "car",
            localField: "cars._id",
            foreignField: "_id",
            as: "car_info"
        }
    },
    // использование документа второй раз
    {
        $addFields: {
            carTypes: {
                $setUnion: "$car_info.type"
            }
        }
    },
    {
        $match: {
            $expr: {
                $gt: [{ $size: "$carTypes" }, 1] // Выбираем только владельцев с несколькими типами машин
            }
        }
    },
    {
        $project: {
            _id: 1,
            ownerName: 1,
            ownerSurname: 1,
            ownerPatronymic: 1
        }
    }
]);

// Запрос с условием на агрегатную функцию: владелец машин, заезжавший раньше всех
db.owner.aggregate([
    {
        $unwind: "$cars"
    },
    {
        $lookup: {
            from: "car",
            localField: "cars._id",
            foreignField: "_id",
            as: "carData"
        }
    },
    {
        $unwind: "$carData"
    },
    {
        $unwind: "$carData.places"
    },
    {
        $sort: {
            "carData.places.arrival": 1
        }
    },
    {
        $group: {
            _id: null,
            minArrival: { $min: "$carData.places.arrival" },
            car_data: { $push: "$$ROOT" }
        }
    },
    {
        $unwind: "$car_data"
    },
    {
        $project: {
            "_id": "$car_data._id",
            ownerName: "$car_data.ownerName",
            ownerSurname: "$car_data.ownerSurname",
            ownerPatronymic: "$car_data.ownerPatronymic",
            minArrival: "$minArrival",
            "is_eq": { $eq: ["$car_data.carData.places.arrival", "$minArrival"] }
        }
    },
    {
        $match: { "is_eq": true }
    }
]);

// Запрос с получением агрегатной функции от агрегатной функции: владелец машины, останавливавшийся на ремонт на минимальном числе парковок
db.owner.aggregate([
    {
        $unwind: "$cars"
    },
    {
        $lookup: {
            from: "car",
            localField: "cars._id",
            foreignField: "_id",
            as: "car"
        }
    },
    {
        $unwind: "$car"
    },
    {
        $lookup: {
            from: "parking",
            localField: "car.places.place_id",
            foreignField: "places._id",
            as: "parking"
        }
    },
    {
        $unwind: "$parking"
    },
    {
        $match: { "parking.places.isUnderRepair": true }
    },
    {
        $group: {
            _id: "$_id",
            ownerId: { $first: "$_id" },
            ownerName: { $first: "$ownerName" },
            parkingIds: { $push: "$parking._id" }
        }
    },
    {
        $project: {
            _id: 0,
            ownerId: 1,
            ownerName: 1,
            numberOfParkings: { $size: "$parkingIds" }
        }
    },
    {
        $group: {
            _id: null,
            minParkingCount: { $min: "$numberOfParkings" },
            owners: { $push: "$$ROOT" }
        }
    },
    {
        $unwind: "$owners"
    },
    {
        $project: {
            _id: "$owners.ownerId",
            ownerName: "$owners.ownerName",
            numberOfParkings: "$owners.numberOfParkings",
            minParkingCount: 1,
            is_eq: { $eq: ["$owners.numberOfParkings", "$minParkingCount"] }
        }
    },
    {
        $match: { "is_eq": true }
    }
]);

// Запрос на разность двух запросов: владелец, не парковавшийся на Вознесенском проспекте
db.owner.aggregate([
  {
    $lookup: {
      from: "car",
      localField: "cars._id",
      foreignField: "_id",
      as: "car_info"
    }
  },
  {
    $lookup: {
      from: "parking",
      localField: "car_info.places.place_id",
      foreignField: "places._id",
      as: "parking_info"
    }
  },
  {
    $lookup: {
      from: "street",
      localField: "parking_info.idStreet",
      foreignField: "_id",
      as: "street_info"
    }
  },
{$project:{_id: 1,
      ownerName: 1,
      ownerSurname: 1,
      ownerPatronymic: 1,"street_info":
 { $filter:{input:"$street_info",as:
"str",cond:{$eq:["$$str.streetName","Вознесенский проспект"]}}}
}},
{$addFields:{"cnt_not_voznes":{$size:"$street_info"}}},
{$match:{"cnt_not_voznes":0}} ] )