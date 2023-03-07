/* neural-network.js SharkCoding */

const NeuralNetwork = function() {
    const rand = (min, max) => Math.random() * (max - min) + min;
    const dot = (a, b) => a.map((x, i) => x * b[i]).reduce((m, n) => m + n);

    class Node {
        constructor(nweights) {
            this.weights = Array.from({ length: nweights }, () => rand(-1, 1));
            this.bias = rand(-1, 1);
        }

        copy() {
            var newCopy = new Node(0);
            newCopy.weights = [...this.weights];
            newCopy.bias = this.bias;
            return newCopy;
        }

        activationFunc(x) {
            return Math.tanh(x);
        }

        evaluate(inputs) {
            if (inputs.length != this.weights.length) return;
            return this.activationFunc(dot(inputs, this.weights) + this.bias);
        }

        static fromWeights(weights, bias) {
            var newCopy = new Node(0);
            weights = [...weights];
            if (!bias) bias = weights.pop();
            newCopy.weights = weights;
            newCopy.bias = bias;
            return newCopy;
        }
    }

    class NeuralNet {
        constructor(...map) {
            this.map = map;
            this.layers = [];
            let prev;
            map.forEach(layer_size => {
                if (prev) this.layers.push(Array.from({ length: layer_size }, () => new Node(prev)));
                prev = layer_size;
            });
        }

        copy() {
            var newCopy = new NeuralNet(this.map);
            var layers = [];
            this.layers.forEach(layer => {
                layers.push(Array.from(layer, (n) => n.copy()));
            });
            newCopy.layers = layers;
            return newNet;
        }

        evaluate(inputs) {
            var values = [...inputs];
            this.layers.forEach(layer => {
                values = Array.from(layer, (n) => n.evaluate(values));
            });
            return values;
        }

        static fromLayers(layers) {
            var newCopy = new NeuralNet();
            layers.forEach(layer => { newCopy.layers.push(Array.from(layer, (weights) => Node.fromWeights(weights))) });
            return newCopy;
        }
    }
    
    return NeuralNet;
}();
