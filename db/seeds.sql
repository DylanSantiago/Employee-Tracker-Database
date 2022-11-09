USE organization_db;

INSERT INTO department (name)
VALUES ("Football Operations"),
       ("Coaching Staff"),
       ("Training Staff"),
       ("Scouting Staff");

INSERT INTO role (title, salary, department_id)
VALUES ("General Manager", 3000000, 1)
       ("Assistant General Manager", 750000, 1)
       ("President", 200000, 1)
       ("Head Coach", 3000000, 2)
       ("Offensive Coordinator", 750000, 2)
       ("Defensive Coordinator", 750000, 2)
       ("Director of High Performance", 900000, 3)
       ("Head Athletic Trainer", 500000, 3)
       ("Strength & Conditioning Coach", 300000, 3)
       ("Director, Player Personnel", 400000, 4)
       ("Pro Scout", 200000, 4)
       ("College Scout", 200000, 4)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joe", "Douglas", 1, NULL),
       ("Rex", "Hogan", 2, 1),
       ("Dylan", "Santiago", 3, 1),
       ("Robert", "Saleh", 4, NULL),
       ("Mike", "LeFleur", 5, 4),
       ("Jeff", "Ulbrich", 6, 4),
       ("Brian", "McCoy", 7, NULL),
       ("Javier", "Vidal", 8, 7),
       ("Ronny", "Vallejo", 9, 7),
       ("Justin", "Ruiz", 10, NULL),
       ("Mike", "Sawicki", 11, 10),
       ("Haris", "Muric", 12, 10),