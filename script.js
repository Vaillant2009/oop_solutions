class Marker {
    constructor(color, inkPercentage) {
        this.color = color;
        this.inkPercentage = inkPercentage;
    }

    print(text) {
        let output = "";
        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            
            if (this.inkPercentage <= 0) {
                console.log("%c[Маркер порожній!]", "color: red; font-weight: bold;");
                break;
            }

            output += char;

            if (char !== " ") {
                this.inkPercentage -= 0.5;
                if (this.inkPercentage < 0) this.inkPercentage = 0;
            }
        }

        console.log(
            `%c${output}`, 
            `color: ${this.color}; font-size: 16px; font-weight: bold;`
        );
        console.log(`Залишку чорнила: ${this.inkPercentage}%\n`);
    }
}

class RefillableMarker extends Marker {
    constructor(color, inkPercentage) {
        super(color, inkPercentage);
    }

    refill() {
        this.inkPercentage = 100;
        console.log(`%c[Маркер кольору ${this.color} успішно заправлено до 100%!]`, "color: green; font-style: italic;");
    }
}

console.log("=== ДЕМОНСТРАЦІЯ ЗАВДАННЯ 1 ===");
const myMarker = new RefillableMarker("blue", 5);
myMarker.print("Привіт! Це перевірка роботи маркера, який має дуже мало чорнила.");

console.log("Заправляємо маркер...");
myMarker.refill();
myMarker.print("Тепер чорнила достатньо, і цей довгий текст надрукується повністю без проблем!");


class ExtendedDate extends Date {
    constructor(...args) {
        super(...args);
    }

    ToTextDate() {
        const months = [
            "січня", "лютого", "березня", "квітня", "травня", "червня",
            "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"
        ];
        const day = this.getDate();
        const month = months[this.getMonth()];
        return `${day} ${month}`;
    }

    isFutureOrCurrent() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const targetDate = new Date(this.getFullYear(), this.getMonth(), this.getDate());
        
        return targetDate >= today;
    }

    isLeapYear() {
        const year = this.getFullYear();
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    getNextDate() {
        const next = new ExtendedDate(this.getTime());
        next.setDate(next.getDate() + 1);
        return next;
    }
}

console.log("=== ДЕМОНСТРАЦІЯ ЗАВДАННЯ 2 ===");
const myDate = new ExtendedDate(2024, 1, 29);

console.log("Дата текстом:", myDate.ToTextDate());
console.log("Чи є рік високосним (2024):", myDate.isLeapYear());
console.log("Чи є дата поточною або майбутньою:", myDate.isFutureOrCurrent());

const nextD = myDate.getNextDate();
console.log("Наступна дата після 29.02.2024:", nextD.ToTextDate(), nextD.getFullYear());


class Employee {
    constructor(name, position, salary) {
        this.name = name;
        this.position = position;
        this.salary = salary;
    }
}

class EmpTable {
    constructor(employees) {
        this.employees = employees;
    }

    getHtml() {
        let html = `<table>\n`;
        html += `  <thead>\n    <tr>\n      <th>Ім'я</th>\n      <th>Посада</th>\n      <th>Зарплата ($)</th>\n    </tr>\n  </thead>\n`;
        html += `  <tbody>\n`;

        for (let emp of this.employees) {
            html += `    <tr>\n`;
            html += `      <td>${emp.name}</td>\n`;
            html += `      <td>${emp.position}</td>\n`;
            html += `      <td>${emp.salary}</td>\n`;
            html += `    </tr>\n`;
        }

        html += `  <tbody>\n`;
        html += `</table>`;
        return html;
    }
}

console.log("=== ДЕМОНСТРАЦІЯ ЗАВДАННЯ 3 ===");
const bankEmployees = [
    new Employee("Олександр Шевченко", "Кредитний менеджер", 1200),
    new Employee("Марія Ковальчук", "Касир", 850),
    new Employee("Іван Петренко", "Аналітик", 1500)
];

const empTable = new EmpTable(bankEmployees);
console.log(empTable.getHtml());


class StyledEmpTable extends EmpTable {
    constructor(employees) {
        super(employees);
    }

    getStyles() {
        return `<style>
    .styled-table {
        border-collapse: collapse;
        margin: 25px 0;
        font-size: 0.9em;
        font-family: sans-serif;
        min-width: 400px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    }
    .styled-table thead tr {
        background-color: #009879;
        color: #ffffff;
        text-align: left;
    }
    .styled-table th,
    .styled-table td {
        padding: 12px 15px;
    }
    .styled-table tbody tr {
        border-bottom: 1px solid #dddddd;
    }
    .styled-table tbody tr:nth-of-type(even) {
        background-color: #f3f3f3;
    }
    .styled-table tbody tr:last-of-type {
        border-bottom: 2px solid #009879;
    }
</style>`;
    }

    getHtml() {
        let baseHtml = super.getHtml();
        baseHtml = baseHtml.replace("<table>", '<table class="styled-table">');
        return `${this.getStyles()}\n${baseHtml}`;
    }
}

console.log("=== ДЕМОНСТРАЦІЯ ЗАВДАННЯ 4 ===");
const styledBankEmployees = [
    new Employee("Олена Мельник", "Головний бухгалтер", 2200),
    new Employee("Андрій Бойко", "Спеціаліст служби безпеки", 1400),
    new Employee("Світлана Бондар", "Операціоніст", 900)
];

const styledEmpTable = new StyledEmpTable(styledBankEmployees);
console.log(styledEmpTable.getHtml());
