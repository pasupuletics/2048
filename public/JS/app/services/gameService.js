Game2048.gameModule.service('game2048Service', [function() {
	var grids = (function(){
		var gridArr =[];
		for( var m = 0; m < 4 ; m++ ){
			gridArr.push([]);
			for ( var n = 0; n < 4; n++ ){
				gridArr[m].push({
					m : m,
					n: n,
					value : 0
				})
			}
		}
		
		return gridArr;
	})();

	function flatten(arr){
		var resultArr =[];
		
		return Array.prototype.concat.apply(resultArr,arr);
	}



	var initialized = false;
	var currentState = [];




	function getNextState(dir){
		var state = [],
			retArray = [];

		if(!initialized){
			state = initialize();
			this.currentState = state;
			return state;
		}
		if(!dir){
			return state;
		}

		var tempArr = [];
		var retArray = [];

		switch(dir){
			case 'up':
				console.log('up');
				//console.log(this.currentState);
				tempArr.push(processArr(getColumn(this.currentState,0),dir, 0));
				tempArr.push(processArr(getColumn(this.currentState,1),dir,1));
				tempArr.push(processArr(getColumn(this.currentState,2),dir,2));
				tempArr.push(processArr(getColumn(this.currentState,3),dir,3));
				//console.log(getColumn(this.currentState,0));

				retArray = reOrderArray(tempArr);

				retArray = randomInsert(retArray);

				this.currentState = retArray;

				//console.log(retArray);

				break;

			case 'down':
				console.log('down');
				tempArr.push(processArr(getColumn(this.currentState,0),dir, 0));
				tempArr.push(processArr(getColumn(this.currentState,1),dir,1));
				tempArr.push(processArr(getColumn(this.currentState,2),dir,2));
				tempArr.push(processArr(getColumn(this.currentState,3),dir,3));
				
				retArray = reOrderArray(tempArr);
				retArray = randomInsert(retArray);

				this.currentState = retArray;
				break;

			case 'right':
				console.log('right');
				tempArr.push(processArr(getRow(this.currentState,0),dir,0));
				tempArr.push(processArr(getRow(this.currentState,1),dir,1));
				tempArr.push(processArr(getRow(this.currentState,2),dir,2));
				tempArr.push(processArr(getRow(this.currentState,3),dir,3));
				retArray = randomInsert(tempArr);

				this.currentState = retArray;


				break;

			case 'left':
				console.log('left');
				tempArr.push(processArr(getRow(this.currentState,0),dir,0));
				tempArr.push(processArr(getRow(this.currentState,1),dir,1));
				tempArr.push(processArr(getRow(this.currentState,2),dir,2));
				tempArr.push(processArr(getRow(this.currentState,3),dir,3));
				retArray = randomInsert(tempArr);

				this.currentState = retArray;
				break;

			default:
				break;

		}

		function reOrderArray(arr){
			var retArr = [],
				tempArr =[];
			for(var i = 0; i < 4; i++ ){
				tempArr = [];
				for(var j = 0; j < 4; j++ ){
					tempArr.push(arr[j][i]);
				}
				retArr.push(tempArr);
			}
			return retArr;
		}

		function getRow(arr, rowNum){
			return arr[rowNum];
		}

		function getColumn( arr, columnNumber){
			var retArr =[];
			$.each(flatten(arr),function(index,value){
				if(value.n === columnNumber){
					retArr.push(value)
				}
			});
			return retArr;

			
		}

		function randomInsert(arr){
			var max = 0;
			function getRandomIndex(ceil){
				return Math.round(Math.random() * ceil);
			}

			function checkIfEmpty(m,n){
				return (arr[m][n].value === 0);
			}

			var possibleValues = [2,4];
			var valueRandom = Math.round(Math.random() * 1);
			var m = getRandomIndex(3);
			var n = getRandomIndex(3);

			while(!checkIfEmpty(m,n) && max < 40){
				m = getRandomIndex(3);
				n = getRandomIndex(3);
				max++;
			}

			arr[m][n].value = possibleValues[valueRandom];


			return arr;
		}


		function processArr(arr,dir,id){
			var retArr = _.filter(arr, function(item){ return item.value !== 0 }),
				i=0,
				lastValue,
				skipNext = false;


			switch(dir){
				case "up":
					_.each(retArr, function(element,index,list){
						
						if(index === 0 ){
							lastValue = element.value;
							return;
						}


						if(element.value === lastValue){
							list[index-1].value += lastValue;
							list[index].value = 0;

						}
						lastValue = element.value;

					});

					retArr = _.filter(retArr, function(item){ return item.value !== 0 });

					for(i = 0; i < 4 ; i++){
						if(retArr[i] === undefined){
							retArr.push({
								m : i,
								n : id,
								value : 0
							})
						}
					}

					for(i = 0; i < 4 ; i++){
						retArr[i].n = id;
						retArr[i].m = i;
					}
					break;

				case "down":

					for( i = retArr.length -1 ; i > -1 ; i--){

						if( i === retArr.length -1){
							lastValue = retArr[retArr.length -1].value;
							continue;
						}

						if( retArr[i].value === lastValue){
							retArr[i + 1].value += lastValue;
							retArr[i].value = 0;
						}
						lastValue = retArr[i].value;
					}

					retArr = _.filter(retArr, function(item){ return item.value !== 0 });

					var len =  4 - retArr.length

					for(i = 0; i < len  ; i++){

						
						retArr.unshift({
							n : id,
							value : 0
						})
						
					}

					for(i = 0; i < 4 ; i++){
						retArr[i].m = i;
						retArr[i].n = id;
					}

					break;

				case  "right":
					for( i = retArr.length -1 ; i > -1 ; i--){

						if( i === retArr.length -1){
							lastValue = retArr[retArr.length -1].value;
							continue;
						}

						if( retArr[i].value === lastValue){
							retArr[i + 1].value += lastValue;
							retArr[i].value = 0;
						}
						lastValue = retArr[i].value;
					}

					retArr = _.filter(retArr, function(item){ return item.value !== 0 });

					var len =  4 - retArr.length

					for(i = 0; i < len  ; i++){

						
						retArr.unshift({
							m : id,
							value : 0
						})
						
					}

					for(i = 0; i < 4 ; i++){
						retArr[i].n = i;
						retArr[i].m = id;

					}
					break;

				case "left" :
					case "up":
						_.each(retArr, function(element,index,list){
							
							if(index === 0 ){
								lastValue = element.value;
								return;
							}


							if(element.value === lastValue){
								list[index-1].value += lastValue;
								list[index].value = 0;

							}
							lastValue = element.value;

						});

						retArr = _.filter(retArr, function(item){ return item.value !== 0 });

						for(i = 0; i < 4 ; i++){
							if(retArr[i] === undefined){
								retArr.push({
									m : id,
									n : i,
									value : 0
								})
							}
						}


						for(i = 0; i < 4 ; i++){
							retArr[i].n = i;
							retArr[i].m = id;
						}
						break;


			}

		
			return retArr;

		}

		console.log(JSON.stringify(retArray));
		return retArray;


	
	}

	function initialize(){
		//return a pseudo random state

		initialized = true;
		grids[0][0].value = 2;
		grids[0][1].value = 2; 
	
		return grids;
	}

	return {
		getState : function(dir){
			return flatten(getNextState(dir));
		}
	}



}]);
