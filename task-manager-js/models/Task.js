class Task {
    constructor(id, title, dueDate = null, status = 'pending', category = 'general', createdAt = new Date()) {
        this.id = id;
        this.title = title;
        this.dueDate = dueDate ? new Date(dueDate) : null;
        this.status = status;
        this.category = category;
        this.createdAt = new Date(createdAt);
    }

    get info() {
        const due = this.dueDate ? this.dueDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        }) : 'no due date';
        return `${this.id}. [${this.status}] ${this.title} (${this.category}) - due: ${due}`;
    }

    markComplete() {
        this.status = 'done';
    }

    isOverdue() {
        if (!this.dueDate) return false;
        const now = new Date();
        return this.status === 'pending' && this.dueDate < now;
    }

    static parse(obj) {
        return new Task(obj.id, obj.title, obj.dueDate, obj.status, obj.category, obj.createdAt);
    }
}

export default Task;