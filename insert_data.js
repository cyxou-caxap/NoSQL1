Use parking
db.createCollection("car")
db.car.insertMany( [
      { regNum: "ш674еу", type: "грузовая", brand: "Toyota", places: 
[{
place_id: ObjectId('65cf307806de048d0034c678'),
arrival: ISODate("2023-02-08T06:31:15Z"), 
departure: ISODate("2023-02-08T08:25:53Z")
}]},
      { regNum: " г123цу ", type: "грузовая", brand: "BMW", places: 
[{
place_id: ObjectId('65cf307806de048d0034c67a'),
arrival: ISODate("2023-02-12T12:45:16Z"), 
departure: ISODate("2023-02-12T16:02:50Z")
},
{
place_id: ObjectId('65cf307806de048d0034c67d'),
arrival: ISODate("2023-02-08T06:31:15Z"), 
departure: ISODate("2023-02-08T08:25:53Z")
}]},
      { regNum: " з908дл ", type: "легковая", brand: "Honda", places: 
[{
place_id: ObjectId('65cf307806de048d0034c67b'),
arrival: ISODate("2023-02-15T12:45:16Z"), 
departure: ISODate("2023-02-15T16:02:50Z")
},
{
place_id: ObjectId('65cf307806de048d0034c67e'),
arrival: ISODate("2023-02-15T12:45:16Z"), 
departure: ISODate("2023-02-15T16:02:50Z")
}]},
      { regNum: " о001ка ", type: "легковая", brand: "Volkswagen", places: 
[{
place_id: ObjectId('65cf307806de048d0034c679'),
arrival: ISODate("2023-02-9T00:05:46Z"), 
departure: ISODate("2023-02-10T23:45:00Z")
}]},
      { regNum: " и236еп ", type: "с прицепом", brand: "Ford", places: 
[{
place_id: ObjectId('65cf307806de048d0034c67f'),
arrival: ISODate("2023-02-15T12:45:16Z"), 
departure: ISODate("2023-02-15T16:02:50Z")
},
{
place_id: ObjectId('65cf307806de048d0034c680'),
arrival: ISODate("2023-02-15T12:45:16Z"), 
departure: ISODate ("2023-02-15T16:02:50Z")
}]},
      { regNum: " ф825мр", type: "с прицепом", brand: "Audi", places: 
[{
place_id: ObjectId('65cf307806de048d0034c67c'),
arrival: ISODate("2023-02-15T12:45:16Z"), 
departure: ISODate("2023-02-15T16:02:50Z")
},
{
place_id: ObjectId('65cf307806de048d0034c681'),
arrival: ISODate("2023-02-15T12:45:16Z"), 
departure: ISODate("2023-02-15T16:02:50Z")
}]}])
db.createCollection("owner")
db.owner.insertMany( [
      { ownerName: "Иван", ownerSurname: "Иванов", ownerPatronymic: "Иванович", cars: 
[
{_id: ObjectId('65c4680702d87c562d05155b')},
{_id: ObjectId('65c4680702d87c562d051560')}
]},
      { ownerName: "Мария", ownerSurname: "Петрова", ownerPatronymic: "Александровна", cars: 
[
{_id: ObjectId('65c4680702d87c562d05155d')},
{_id: ObjectId('65c4680702d87c562d05155e')}
]},
      { ownerName: "Алексей", ownerSurname: "Смирнов", ownerPatronymic: "Дмитриевич", cars: 
[
{_id: ObjectId('65c4680702d87c562d05155c')}
]},
      { ownerName: "Екатерина", ownerSurname: "Козлова", ownerPatronymic: "Андреевна", cars: 
[
{_id: ObjectId('65c4680702d87c562d05155f')}
]},
      { ownerName: "Дмитрий", ownerSurname: "Кузнецов", ownerPatronymic: "Сергеевич", cars: 
[
{_id: ObjectId('65c4680702d87c562d05155f')},
{_id: ObjectId('65c4680702d87c562d051560')}
]},
      { ownerName: "Анна", ownerSurname: "Новикова", ownerPatronymic: "Игоревна", cars: 
[
{_id: ObjectId('65c4680702d87c562d05155d')}
]},
])
db.createCollection("street")
db.street.insertMany( [
      { streetName: "Линия 2-я Васильевского острова"},
      { streetName: "ул. Передовиков"},
      { streetName: "Вознесенский проспект"},
      { streetName: "Линия 7-я Васильевского острова"},
      { streetName: "Лиговский проспект"}
   ] )
db.createCollection("parking")
db.parking.insertMany( [
      { address: 25, idStreet: ObjectId('65c477fa02d87c562d051570'), places: 
[
{_id: ObjectId(), number:"F4", type: "грузовая", isUnderRepair: true},
{_id: ObjectId(), number:"A3", type: "легковая", isUnderRepair: false}
]},
      { address: 14, idStreet: ObjectId('65c477fa02d87c562d05156f'), places: 
[	
{_id: ObjectId(), number:"B5", type: "грузовая", isUnderRepair: true},
{_id: ObjectId(), number:"J2", type: "легковая", isUnderRepair: false}
]},
      { address: 1, idStreet: ObjectId('65c477fa02d87c562d051571'), places: 
[
{_id: ObjectId(), number:"Q9", type: "с прицепом", isUnderRepair: true},
{_id: ObjectId(), number:"W6", type: "грузовая", isUnderRepair: false}
]},
      { address: 164, idStreet: ObjectId('65c477fa02d87c562d051573'), places: 
[
{_id: ObjectId(), number:"S1", type: "легковая", isUnderRepair: false},
{_id: ObjectId(), number:"L4", type: "с прицепом", isUnderRepair: true}
]},
      { address: 7, idStreet: ObjectId('65c477fa02d87c562d051572'), places: 
[
{_id: ObjectId(), number:"M7", type: "с прицепом", isUnderRepair: false},
{_id: ObjectId(), number:"D2", type: "с прицепом", isUnderRepair: false}
]}
] )
