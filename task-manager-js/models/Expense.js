class Expense {
    constructor(id, title, amount, category = 'general', date = new Date()) {
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.category = category;
        this.date = new Date(date);
    }

    get info() {
        const formattedAmount = this.amount.toFixed(2);
        const formattedDate = this.date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
        return `${this.id}. ${this.title} - $ ${formattedAmount} (${this.category}) on ${formattedDate}`;
    }

    static parse(obj) {
        return new Expense(obj.id, obj.title, obj.amount, obj.category, obj.date);
    }
}

// current file path comparison with file path executed with node. 
if (import.meta.url === `file://${process.argv[1]}`) {
    const e1 = new Expense(1, "Lunch", 12.5, "Food", new Date());
    console.log(e1.info);
}