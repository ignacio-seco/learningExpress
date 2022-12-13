export default function deepSort(conjunto, key) {
  function isAnObject(testedObject) {
    if (
      typeof testedObject === "object" &&
      !Array.isArray(testedObject) &&
      testedObject !== null
    ) {
      return true;
    } else {
      return false;
    }
  }

  let result = {};
  let tTest = [conjunto];
  let arr = [0];
  let i = 0;
  let t;
  let lTest;
  let tType;
  let foundKey;
  let fkTest;
  if (isAnObject(tTest)) {
    lTest = Object.keys(tTest);
  } else {
    lTest = tTest;
  } //observe que isso faz com que lTest seja sempre uma array...

  for (; arr.length > 0; ) {
    //console.log(arr)
    for (; arr[i] < lTest.length; ) {
      if (isAnObject(tTest)) {
        tType = tTest[lTest[arr[i]]];
      } else {
        tType = tTest[arr[i]];
      }
      console.log(
        `This array represent the coordinates that the for loop is looking at [ ${arr} ]`
      ); //O último valor representa a posição que está sendo analisada, enquanto os valores anteriores o caminho que está sendo percorrido até esta posição.
      if (isAnObject(tType)) {
        //aqui começa a formula quando o valor analizado em tTest[arr[i]] é um objeto e poderia ter a key procurada, passos, necessários 1- se tiver a key, fazer o cadastro e procurar no próximo nivel de arr[i], se não tiver a chave, fazer com que i suba de nível e procurar por objetos dentro de objetos ou arrays.
        if (key in tType) {
          foundKey = tType[key];
          //situação em que a chave foi encontrada no objeto
          if (isAnObject(foundKey)) {
            //situação em que a chave é uma array de valores
            fkTest = Object.keys(foundKey);
            if (fkTest.length > 0) {
              for (t = 0; t < fkTest.length; t++) {
                if (!(foundKey[fkTest[t]] in result)) {
                  //aqui testamos se já existe uma key com o nome do valor da chave encontrada. Se tiver o objeto é cadastrado nesse array, se não tiver é criada a chave como o array e o objeto é colocado nela. No primeiro if a chave não existe e precisa ser criada
                  result[foundKey[fkTest[t]]] = [];
                  result[foundKey[fkTest[t]]].push(tType);
                } // situação em que a chave já existia no conjunto result
                else {
                  result[foundKey[fkTest[t]]].push(tType);
                }
              }
              {
                if (Object.keys(tType).length > 0) {
                  // é necessário garantir que não estamos olhando um objeto vazio porque se atualizarmos a profundidade da arvore com objeto vazio a função retornará um erro ao não conseguir ler a propriedade do objeto que não existe.
                  i = i + 1;
                  arr[i] = 0;
                  tTest = tType;
                  lTest = Object.keys(tTest);
                } else {
                  arr[i] = arr[i] + 1;
                }
              }
            } else {
              //situação em que a chave encontrada é uma array vazia
              if (!(`empty` in result)) {
                //aqui testamos se já existe uma key com o nome do valor da chave encontrada. Se tiver o objeto é cadastrado nesse array, se não tiver é criada a chave como o array e o objeto é colocado nela. No primeiro if a chave não existe e precisa ser criada
                result[`empty`] = [];
                result[`empty`].push(tType);
                if (Object.keys(tType).length > 0) {
                  // é necessário garantir que não estamos olhando um objeto vazio porque se atualizarmos a profundidade da arvore com objeto vazio a função retornará um erro ao não conseguir ler a propriedade do objeto que não existe.
                  i = i + 1;
                  arr[i] = 0;
                  tTest = tType;
                  lTest = Object.keys(tTest);
                } else {
                  arr[i] = arr[i] + 1;
                }
              } // situação em que a chave já existia no conjunto result
              else {
                result[`empty`].push(tType);
                if (Object.keys(tType).length > 0) {
                  // é necessário garantir que não estamos olhando um objeto vazio porque se atualizarmos a profundidade da arvore com objeto vazio a função retornará um erro ao não conseguir ler a propriedade do objeto que não existe.
                  i = i + 1;
                  arr[i] = 0;
                  tTest = tType;
                  lTest = Object.keys(tTest);
                } else {
                  arr[i] = arr[i] + 1;
                }
              }
            }
          } else if (Array.isArray(foundKey)) {
            //situação em que a chave é uma array de valores
            if (foundKey.length > 0) {
              for (t = 0; t < foundKey.length; t++) {
                if (!(foundKey[t] in result)) {
                  //aqui testamos se já existe uma key com o nome do valor da chave encontrada. Se tiver o objeto é cadastrado nesse array, se não tiver é criada a chave como o array e o objeto é colocado nela. No primeiro if a chave não existe e precisa ser criada
                  result[foundKey[t]] = [];
                  result[foundKey[t]].push(tType);
                } // situação em que a chave já existia no conjunto result
                else {
                  result[foundKey[t]].push(tType);
                }
              }
              {
                if (Object.keys(tType).length > 0) {
                  // é necessário garantir que não estamos olhando um objeto vazio porque se atualizarmos a profundidade da arvore com objeto vazio a função retornará um erro ao não conseguir ler a propriedade do objeto que não existe.
                  i = i + 1;
                  arr[i] = 0;
                  tTest = tType;
                  lTest = Object.keys(tTest);
                } else {
                  arr[i] = arr[i] + 1;
                }
              }
            } else {
              //situação em que a chave encontrada é uma array vazia
              if (!(`empty` in result)) {
                //aqui testamos se já existe uma key com o nome do valor da chave encontrada. Se tiver o objeto é cadastrado nesse array, se não tiver é criada a chave como o array e o objeto é colocado nela. No primeiro if a chave não existe e precisa ser criada
                result[`empty`] = [];
                result[`empty`].push(tType);
                if (Object.keys(tType).length > 0) {
                  // é necessário garantir que não estamos olhando um objeto vazio porque se atualizarmos a profundidade da arvore com objeto vazio a função retornará um erro ao não conseguir ler a propriedade do objeto que não existe.
                  i = i + 1;
                  arr[i] = 0;
                  tTest = tType;
                  lTest = Object.keys(tTest);
                } else {
                  arr[i] = arr[i] + 1;
                }
              } // situação em que a chave já existia no conjunto result
              else {
                result[`empty`].push(tType);
                if (Object.keys(tType).length > 0) {
                  // é necessário garantir que não estamos olhando um objeto vazio porque se atualizarmos a profundidade da arvore com objeto vazio a função retornará um erro ao não conseguir ler a propriedade do objeto que não existe.
                  i = i + 1;
                  arr[i] = 0;
                  tTest = tType;
                  lTest = Object.keys(tTest);
                } else {
                  arr[i] = arr[i] + 1;
                }
              }
            }
          } else {
            //situação em que a chave encontrada é um valor
            if (!(foundKey in result)) {
              //aqui testamos se já existe uma key com o nome do valor da chave encontrada. Se tiver o objeto é cadastrado nesse array, se não tiver é criada a chave como o array e o objeto é colocado nela. No primeiro if a chave não existe e precisa ser criada
              result[foundKey] = [];
              result[foundKey].push(tType);
              if (Object.keys(tType).length > 0) {
                // é necessário garantir que não estamos olhando um objeto vazio porque se atualizarmos a profundidade da arvore com objeto vazio a função retornará um erro ao não conseguir ler a propriedade do objeto que não existe.
                i = i + 1;
                arr[i] = 0;
                tTest = tType;
                lTest = Object.keys(tTest);
              } else {
                arr[i] = arr[i] + 1;
              }
            } // situação em que a chave já existia no conjunto result
            else {
              result[foundKey].push(tType);
              if (Object.keys(tType).length > 0) {
                // é necessário garantir que não estamos olhando um objeto vazio porque se atualizarmos a profundidade da arvore com objeto vazio a função retornará um erro ao não conseguir ler a propriedade do objeto que não existe.
                i = i + 1;
                arr[i] = 0;
                tTest = tType;
                lTest = Object.keys(tTest);
              } else {
                arr[i] = arr[i] + 1;
              }
            }
          }
        } //aqui encerra a situação em que a chave foi encontrada.
        else {
          //situação em que a chave não foi encontrada no objeto
          if (Object.keys(tType).length > 0) {
            // é necessário garantir que não estamos olhando um objeto vazio porque se atualizarmos a profundidade da arvore com objeto vazio a função retornará um erro ao não conseguir ler a propriedade do objeto que não existe.
            i = i + 1;
            arr[i] = 0;
            tTest = tType;
            lTest = Object.keys(tTest);
          } else {
            arr[i] = arr[i] + 1;
          }
        }
      } else if (Array.isArray(tType)) {
        //aqui começa as ações se o item que está sendo analisado é uma array, e não pode ter a chave: passos, apenas subir um nível em arr[i] e atualizar o ltest para que represente o novo tamanho do novo nível do arr[i]
        if (tType.length > 0) {
          i = i + 1;
          arr[i] = 0;
          tTest = tType;
          lTest = tTest;
        } else {
          arr[i] = arr[i] + 1;
        }
      } else {
        arr[i] = arr[i] + 1; //nesse caso o item é um valor e o loop deve apenas continuar sem atualizar o lTest
      }
    }
    {
      //aqui é a ação a ser tomada quando o o valor de arr[i] ultrapassar o valor de length da array ltest. É melhor cadastrar a regra para conter o loop do primeiro for aqui uma vez que, aqui, é possível utilizar regras if enquanto no loop for não é...
      if (arr.length > 1) {
        console.log(`This is the array before the pop() comand [${arr}]`);
        i = i - 1; //isso retrocede a profundidade paara o nível anterior
        arr[i] = arr[i] + 1; //isso faz com que o loop não olhe o mesmo item novamente e siga em frente com a checagem
        arr.pop(); ///isso diminui o valor de arr.length e é necessário para o primeiro loop não ser eterno.
        console.log(`This is the new array after the pop() comand [${arr}]`);
        //nessa etapa é necessário reconstruir o tTest e o lTest para que eles estejam em conformidade com os valores que serão analisados, para isso usamos as coordenadas que já existem na array arr. O problema é que é necessário checar, para cada valor desse, se o que está ali é um objeto ou um array e no caso de objeto cadastrar a key no tTest e não o valor como fazemos com uma array. Ao final, atualizar o valor ltest para garantir que seja tratado como uma array ainda que o tTest final seja um objeto.
        tTest = conjunto;
        for (let y = 0; y < arr.length - 1; y++) {
          if (isAnObject(tTest)) {
            tTest = tTest[Object.keys(tTest)[arr[y]]];
          } else {
            tTest = tTest[arr[y]];
          }
        }
        {
          if (isAnObject(tTest)) {
            lTest = Object.keys(tTest);
          } else {
            lTest = tTest;
          }
        }
        //aqui comecei a inserir a checagem de undefined
      } //aqui se encerra o if
      else {
        arr.pop();
        ///nessa situação a formula se caminha para a derradeira conclusão.
      }
    }
  }
  {
    console.log("this function is finished");
    //resultado quando toda formula encerra
    return result;
  }
}
