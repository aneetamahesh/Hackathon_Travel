/ Apriori algorithm

// Importing the necessary modules

const fs = require('fs');




// Define parameters

// Minimum Support

const minSupport = 0.5;

// Minimum confidence level

const minConfidence = 0.6;




// Read data

const data = fs.readFileSync('data.txt', 'utf8');

// Converting data to arrays

const dataArray = data.split('\n');

// Converting data to two-dimensional arrays

const dataMatrix = dataArray.map(item => item.split(' '));




// Define function

// Calculate support

function calcSupport(itemSet) {

  let support = 0;

  dataMatrix.forEach(data => {

    let flag = true;

    itemSet.forEach(item => {

      if (!data.includes(item)) {

        flag = false;

      }

    });

    if (flag) {

      support++;

    }

  });

  return support / dataMatrix.length;

}




// Calculate the confidence level

function calcConfidence(itemSet, itemSet2) {

  let confidence = 0;

  let support1 = 0;

  let support2 = 0;

  dataMatrix.forEach(data => {

    let flag1 = true;

    let flag2 = true;

    itemSet.forEach(item => {

      if (!data.includes(item)) {

        flag1 = false;

      }

    });

    itemSet2.forEach(item => {

      if (!data.includes(item)) {

        flag2 = false;

      }

    });

    if (flag1) {

      support1++;

    }

    if (flag2) {

      support2++;

    }

    if (flag1 && flag2) {

      confidence++;

    }

  });

  return confidence / support1;

}




// Initialize frequent itemsets

let frequentItemSet = [];

// Initialization of association rules

let associationRules = [];




// Calculate the 1-term set

dataMatrix.forEach(data => {

    data.forEach(item => {

        let itemSet = [item];

        let support = calcSupport(itemSet);

        if (support >= minSupport) {

          frequentItemSet.push({

            itemSet,

            support

          });

        }

      });

    });

   

    // Calculate the k-term set

    let k = 2;

    while (frequentItemSet.length > 0) {

      let newFrequentItemSet = [];

      for (let i = 0; i < frequentItemSet.length; i++) {

        for (let j = i + 1; j < frequentItemSet.length; j++) {

          let itemSet1 = frequentItemSet[i].itemSet;

          let itemSet2 = frequentItemSet[j].itemSet;

          let itemSet = itemSet1.concat(itemSet2);

          if (itemSet.length === k) {

            let support = calcSupport(itemSet);

            if (support >= minSupport) {

              newFrequentItemSet.push({

                itemSet,

                support

              });

            }

          }

        }

      }

      frequentItemSet = newFrequentItemSet;

      k++;

    }

   

    // Calculating association rules

    frequentItemSet.forEach(itemSet => {

      let itemSet1 = itemSet.itemSet;

      for (let i = 0; i < itemSet1.length; i++) {

        let itemSet2 = itemSet1.filter(item => item !== itemSet1[i]);

        let confidence = calcConfidence(itemSet1, itemSet2);

        if (confidence >= minConfidence) {

          associationRules.push({

            itemSet1,

            itemSet2,

            confidence

          });

        }

      }

    });

   

    // Output results

    console.log('Frequent item set.');

    frequentItemSet.forEach(itemSet => {

      console.log(`${itemSet.itemSet.join(' ')}: ${itemSet.support}`);

    });

    console.log('Affiliation rules.');

    associationRules.forEach(rule => {

      console.log(`${rule.itemSet1.join(' ')} => ${rule.itemSet2.join(' ')}: ${rule.confidence}`);

    });