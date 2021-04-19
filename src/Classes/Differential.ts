class Differential {
    /*Properties */
    population = [];
    fitness = [];
    initialPopulation: number[];
    initialFitness = []
    cr: number;
    miu: number;
    generations: number;

    constructor(range: number[], populationSize: number,
        generations: number, miu: number, cr: number) {

        [this.initialPopulation, this.initialFitness] = this.generatePopulation(range, populationSize);
        this.population.push(this.initialPopulation);
        this.fitness.push(this.initialFitness);
        this.generations = generations;
        this.miu = miu;
        this.cr = cr;

    }

    fitnessFunction(x: number, y: number, z: number) {
        return x + Math.pow(y, 2) + Math.pow(z, 3);
    }

    createNewGeneration() {
        let newGen = [];
        let newFitness = [];
        let oldGen = this.population[this.population.length - 1];
        let oldFitness = this.fitness[this.fitness.length - 1];

        console.log("Old gen was: ", oldGen);
        console.log("Old gen fitness was: ", oldFitness);
        console.log("---------------------------");
        //Iterating over oldgen to take each one as goal and anything else as possible W
        for (let i = 0; i < oldGen.length; i++) {
            let goal = oldGen[i];
            let bagOfVs = [...oldGen];
            let W;
            let WFitness = 0;
            bagOfVs.splice(i, 1);
            let v1, v2, v3;

            //Choosing Vs from bag of vs , then calculating W and comparing fitness
            [v1, v2, v3] = this.chooseFrom(bagOfVs);
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
    }

    getW(obj: number[], v1: number[], v2: number[], v3: number[]) {
        const wi = (v1i: number, v2i: number, v3i: number) => v1i + this.miu * (v2i - v3i);
        let W = [];
        for (let i = 0; i < obj.length; i++) {
            W.push(wi(v1[i], v2[i], v3[i]));
        }
        return W;
    }

    chooseFrom(bagOfVs) {
        let selected = [];
        while (selected.length < 3) {
            let index = this.randomNumber([0, bagOfVs.length - 1]);
            selected.push(bagOfVs[index]);
            bagOfVs.splice(index, 1);
        }
        return selected;
    }

    randomNumber(range: number[]): number {
        let min, max;
        [min, max] = range;
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    generatePopulation(range: number[], size: number): [any, any] {
        let generatedPopulation = [];
        let generatedFitness = [];

        while (generatedPopulation.length < size) {
            let candidate = [this.randomNumber(range), this.randomNumber(range),
            this.randomNumber(range)];

            let alreadyIn = false;
            for (let specimen of this.population) {
                if (specimen === candidate)
                    alreadyIn = true;
            }

            if (!alreadyIn) {
                generatedPopulation.push(candidate);
            }

        }

        generatedFitness = generatedPopulation.map(s => this.fitnessFunction(s[0], s[1], s[2]));
        this.population.push(generatedPopulation);
        this.fitness.push(generatedFitness);

        return [generatedPopulation, generatedFitness];
    }
}


//const diff = new Differential([-10, 10], 4, 10, 0.5, 0.5);
//console.log(diff.createNewGeneration());
