onmessage = function(event) {
    let n = event.data.n;

    let factors = [];
    let divisor = 2;

    while (n >= 2) {
        if (n % divisor == 0) {
            factors.push(divisor);
            n = n / divisor;
        } else {
            divisor++;
        }
    }
    
    postMessage({
        id: event.data.id,
        factors: factors,
    });
}