// Workers passed in should all have the same script so that the pool can choose
// as needed between the workers. Example: new Worker('/path/to/script.js');

// the script should start it's logic within the onmessage function, and end it's
// logic by returning with a postMessage. To track jobs, the pool takes the args
// object supplied when run is called and adds an 'id'. This id value should
// be returned in the postMessage like postMessage({id: event.data.id, ...}) where
// event is the event parameter from the onmessage function and ... is any data
// that makes up the result of the script's execution.

export class Pool {
    constructor(workers) {
        this.workers = []
        workers.forEach(worker => {
            this.workers.push(new PoolWorker(worker));
        });
    }
    
    run(args) {
        return new Promise((resolve, reject) => {
            this.addJob(args, event => resolve(event.data));
        });
    }

    addJob(args, handler) {
        let sortedWorkers = [...this.workers].sort((a, b) => a.jobs.length - b.jobs.length);
        console.log(`worker load: ${this.workers.map(w => w.status()).join('')}`);
        sortedWorkers[0].startJob(args, handler);
    }
}

class PoolWorker {
    constructor(worker) {
        this.jobId = 0;
        this.jobs = [];
        this.worker = worker;
        this.worker.onmessage = this.endJob.bind(this);
        this.handlers = {};
    }

    endJob(event) {
        let id = event.data.id;
        this.handlers[id](event);
        this.removeJob(id);
        delete this.handlers[id];
    }

    removeJob(id) {
        var index = this.jobs.indexOf(id);
        if (index !== -1)
            this.jobs.splice(index, 1);
    }

    startJob(args, handler) {
        let id = this.jobId++;
        this.jobs.push(id);
        this.handlers[id] = handler;
        this.worker.postMessage({id: id, ...args});
    }

    status() {
        if (this.jobs.length == 0) return '▁';
        if (this.jobs.length == 1) return '▃';
        if (this.jobs.length == 2) return '▅';
        // warning zones
        if (this.jobs.length >= 5) return '▓';
        if (this.jobs.length >= 3) return '▒';
    }
}
