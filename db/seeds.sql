USE work_db;

INSERT INTO department (names)
VALUES ("Engineering"),
        ("Research and Development"),
        ("Marketing"),
        ("Sales"),
        ("Management");

INSERT INTO roles (title, salary, departmentId)
VALUES ("CEO", 300000, 5),
        ("Board Member", 200000, 5),
        ("Sales Lead", 150000, 4),
        ("Sales Agent", 100000, 4),
        ("Head Marketing", 80000, 3),
        ("Advertiser", 60000, 3),
        ("Scientist", 50000, 2),
        ("Lab Technician", 40000, 2),
        ("Designer", 70000, 1),
        ("Foreman", 50000, 1);

INSERT INTO employee (first_name, last_name, roleId, managerId)
VALUES ("Jack", "Johnson", 1, NULL),
        ("Jeff", "Goldbloom", 2, 1),
        ("Eric", "Andre", 3, 1),
        ("Hannible", "Hoser", 4, 3),
        ("John", "Amble", 5, 1),
        ("Emily", "Blunt", 6, 5),
        ("Sarah", "Wellor", 7, 2),
        ("Paul", "Litbor", 8, 7),
        ("Tyson", "Ball", 9, 5),
        ("Jewel", "McGeller", 10, NULL);



