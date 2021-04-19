var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var Differential = /** @class */ (function () {
    function Differential(range, populationSize, generations, miu, cr) {
        var _a;
        /*Properties */
        this.population = [];
        this.fitness = [];
        this.initialFitness = [];
        _a = this.generatePopulation(range, populationSize), this.initialPopulation = _a[0], this.initialFitness = _a[1];
        this.population.push(this.initialPopulation);
        this.fitness.push(this.initialFitness);
        this.generations = generations;
        this.miu = miu;
        this.cr = cr;
    }
    Differential.prototype.fitnessFunction = function (x, y, z) {
        return x + Math.pow(y, 2) + Math.pow(z, 3);
    };
    Differential.prototype.createNewGeneration = function () {
        var _a;
        var newGen = [];
        var newFitness = [];
        var oldGen = this.population[this.population.length - 1];
        var oldFitness = this.fitness[this.fitness.length - 1];
        console.log("Old gen was: ", oldGen);
        console.log("Old gen fitness was: ", oldFitness);
        console.log("---------------------------");
        //Iterating over oldgen to take each one as goal and anything else as possible W
        for (var i = 0; i < oldGen.length; i++) {
            var goal = oldGen[i];
            var bagOfVs = __spreadArray([], oldGen);
            var W = void 0;
            var WFitness = 0;
            bagOfVs.splice(i, 1);
            var v1 = void 0, v2 = void 0, v3 = void 0;
            //Choosing Vs from bag of vs , then calculating W and comparing fitness
            _a = this.chooseFrom(bagOfVs), v1 = _a[0], v2 = _a[1], v3 = _a[2];
            W = this.getW(goal, v1, v2, v3);
            WFitness = this.fitnessFunction(W[0], W[1], W[2]);
            console.log("Goal: ", goal);
            console.log("Vs: ", v1, v2, v3);
            console.log("W:", W);
            console.log("Wfitness: ", WFitness);
            console.log("Pop size: ", oldGen.length);
            console.log("------------");
            if (oldFitness[i] < WFitness) {
                newGen.push(W);
                newFitness.push(WFitness);
            }
            else {
                newGen.push(oldGen[i]);
                newFitness.push(oldFitness[i]);
            }
        }
        return [newGen, newFitness];
    };
    Differential.prototype.getW = function (obj, v1, v2, v3) {
        var _this = this;
        var wi = function (v1i, v2i, v3i) { return v1i + _this.miu * (v2i - v3i); };
        var W = [];
        for (var i = 0; i < obj.length; i++) {
            W.push(wi(v1[i], v2[i], v3[i]));
        }
        return W;
    };
    Differential.prototype.chooseFrom = function (bagOfVs) {
        var selected = [];
        while (selected.length < 3) {
            var index = this.randomNumber([0, bagOfVs.length - 1]);
            selected.push(bagOfVs[index]);
            bagOfVs.splice(index, 1);
        }
        return selected;
    };
    Differential.prototype.randomNumber = function (range) {
        var min, max;
        min = range[0], max = range[1];
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    Differential.prototype.generatePopulation = function (range, size) {
        var _this = this;
        var generatedPopulation = [];
        var generatedFitness = [];
        while (generatedPopulation.length < size) {
            var candidate = [this.randomNumber(range), this.randomNumber(range),
                this.randomNumber(range)];
            var alreadyIn = false;
            for (var _i = 0, _a = this.population; _i < _a.length; _i++) {
                var specimen = _a[_i];
                if (specimen === candidate)
                    alreadyIn = true;
            }
            if (!alreadyIn) {
                generatedPopulation.push(candidate);
            }
        }
        generatedFitness = generatedPopulation.map(function (s) { return _this.fitnessFunction(s[0], s[1], s[2]); });
        return [generatedPopulation, generatedFitness];
    };
    return Differential;
}());
var diff = new Differential([-10, 10], 4, 10, 0.5, 0.5);
console.log(diff.createNewGeneration());
