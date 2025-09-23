export default function idGenerator(start = 1) {
    let currentId = start;

    return {
        getNextId() {
            return currentId++;
        }
    }
}