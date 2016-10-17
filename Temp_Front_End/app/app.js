(function() {


	var app = angular.module("chieveApp", [
		'ngRoute'
	]);


	/*Routes*/
	/*
	Template url sets url for injected HTML
	controller sets controller name
	controllerAs sets namespace for controller when 
	it is instantiated as an object and bound to the current scope
	*/
	app.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'app/views/landing_page/landing_page.html',
				controller: 'LandingPageCtrl',
				controllerAs: 'LandingPage'
			})
			.when('/dashboard', {
				templateUrl: 'app/views/dashboard/dashboard.html',
				controller: 'DashboardCtrl',
				controllerAs: 'Dashboard'
			});
	});

	/*Controllers*/
	/*
	Use to bind view and model, 
	and inclusion of helper functions not used elsewhere
	*/

	app.controller('LandingPageCtrl', function($scope, $rootScope, $location) {
		//Set $rootScope variables
		$rootScope.title = "Accomplish your goals | Chieve";
		$rootScope.css = "public/assets/pageCSS/landing_page.css";
		$rootScope.js = "public/js/pages/landing_page.js";

		//Set variable stores used in form elements
		$scope.goal_store = {};
		$scope.tasks_store = [
			{id: "task1"}
		];

		//Stores goal variable into $scope.goal_store
		/*
		 *TODO: Access if this function is actually needed or if we can just store it using {{}}
		 *NOTES: Storing the goal this way allows us to store other variables to goal_store without
		 *		a {{}} in the view. Is this valuable for us?
		 */
		$scope.storeGoal = function(goal) {
	       console.log(goal.title);
	       $scope.goal_store.title = goal.title;
	    };

	    //Appends a task to $scope.tasks_store, which appends it to the ng-repeat in the view
	    /*
	     *No need for a storeTask function because they are tied to the tasks_store variable
	     * using the ng-repeat
	     */
	    $scope.addNewTask = function() {
	    	var newTaskId = $scope.tasks_store.length + 1;
	    	$scope.tasks_store.push({id: "task" + newTaskId});
	    };

	    //Prints tasks in task store to the console
	    $scope.printTasks = function() {
	    	//Access $scope.tasks_store to print using JSON.stringify()
	    	var tasks = $scope.tasks_store;
	    	//Loop and print each object in object array
	    	for(i = 0; i < tasks.length; i++) {
		    	console.log(JSON.stringify(tasks[i]));
		    };
	    }

	    //Signs In user
	    $scope.signIn = function(user) {
	    	$scope.user.email = user.email;
	    	$scope.user.pass = user.pass;
	    	//if the email does not follow the form /[\w\d]+@[\w]+/g it will return undefined
	    	//Call auth sequence when this is not the case
	    	if(user.email != undefined) {
				//TEMPORARY CODE BELOW
				$location.path("dashboard");
	    	}
	    }

	    //Signs Up user
	    $scope.signIn = function(user) {
	    	$scope.user.email = user.email;
	    	$scope.user.pass = user.pass;
	    	//if the email does not follow the form /[\w\d]+@[\w]+/g it will return undefined
	    	//Call auth sequence when this is not the case
	    	if(user.email != undefined) {
	    		//TEMPORARY CODE BELOW
				$location.path("dashboard");
	    	}
	    }

	});

	app.controller('DashboardCtrl', function($scope, $rootScope, $location) {
		//Set $rootScope variables
		$rootScope.title = "Home | Chieve";
		//$rootScope.css = "public/assets/pageCSS/dashboard.css";
		$rootScope.js = "public/js/pages/dashboard.js";

		//Set variable stores used in form elements
		$scope.taskList = [{order: 1, name: "one", id:12, description:""},
			{order: 2, name: "two", id:1254, description:""},
			{order: 3, name: "three", id: 1356, description:""}
		];

		$scope.printTaskList = function() {
			console.log($scope.taskList);
		};

	});



	/*Factories*/
	/*
	Reusable features or abstract models
	*/

	//app.factory('')




	/*Directives*/
	/*
	Introduces new syntax to extend HTML
	*/

	/*-- dragonDrag.js --*/

	/**
	 * @desc Set of directives for drag and drop functionality. Named dragon for fun, x for HTML5 compliance
	 * 
	 * @example <div x-dragon-drag></div> or <div data-dragon-drag></drag>
	 */
	app.directive('dragDropList', function($timeout) {
		//Return directive definition object here:
		return {
			//Restrict determines use of the directive
				//"A" allows use as an attribute
				//"E" allows use as an element
			restrict: "AE",
			//Replace will replace the HTML markup with the template when compiled
			replace: "true",
			//Template specifies location of markup used in directive
			templateUrl: "app/common/directives/drag-drop-list/drag_drop_list.html",
			scope: {
				//Isolated binding defined by "=", required for non-string variable
				dragDropList: '=info',
				listIdAttr: '@listId'
			},
			//Link allows utilization of scope, attributes, and DOM manipulations using jQuery
				//Attributes on the element that the directive is applied to can be accessed
					//using attributes.nameOfAttribute
			link: function(scope, element, attributes) {
				/*-- DOM Attributes --*/
				//Corresponds to list-id attribute
				var listIdAttribute = "#" + attributes.listId;
				/*-- Functions --*/
					/*-- Move Array Element --*/
					//Moves array element from one index to the next
					//Example: moveArrayElementPosition(0,1,scope.dragDropList)
					function moveArrayElementPosition(old_index, new_index, target_array) {
						//Cut out element that will be moved
						//Returned in an array, access with index
						var elementToMove = target_array.splice(old_index, 1)[0];
						//insert element at new_index
						target_array.splice(new_index, 0, elementToMove);
						//Update order attribute by indicies 
						for(objectIndex in target_array) {
							target_array[objectIndex].order = objectIndex;
						}
					}
					
					/*-- Gets task id from its DOM object --*/
					function getDOMTaskId(DOMElement) {
						return DOMElement.attr("id").split("-")[2];
					}

					/*-- Retrives current order of scope task list --*/
					function currentTaskOrder_scope() {
						var taskOrder_scope = [];

						for(index in scope.dragDropList) {
							taskOrder_scope.push(scope.dragDropList[index].id)
						}

						return taskOrder_scope;
					}

				/*-- Directive.ready function--*/
				//$timeout with 0 delay used due to ng-repeat to allow rendering
				$timeout(function() {
					/*-- Specific DOM Functions --*/
					//Functions that target specific DOM elements
						/*-- List Order Reader --*/
						//Returns list of task id's as they appear in the DOM
						function currentListOrder() {
							var TaskDOMElementArray = $(listIdAttribute).children().children(".drag-drop-container");
							var TaskIdArray = [];

							TaskDOMElementArray.each(function() {
								TaskIdArray.push(getDOMTaskId($(this)));
							})

							return TaskIdArray;
						}

						//Function that locates the current position of a element
						//Utilizes currentListOrder(), taskId is always a string and taskIdArray can be a [string] or [int]
						function locateTaskPositionById(taskId, taskIdArray) {
							if(typeof taskIdArray[0] == 'number') {
								return taskIdArray.indexOf(parseInt(taskId));
							} else if(typeof taskIdArray[0] == 'string') {
								return taskIdArray.indexOf(taskId);
							} else {
								console.log('Error at dragDropList.locateTaskPositionById()')
							}
						}

						//Function that updates scope "order" attribute of task objects
						function moveTask_scope(taskDOMObj) {
							var taskId = getDOMTaskId(taskDOMObj);
							var taskIdArray_scope = currentTaskOrder_scope();
							var taskIdArray = currentListOrder();
							//Locate Task in both arrays
							var taskOldOrder = locateTaskPositionById(taskId, taskIdArray_scope);
							var taskNewOrder = locateTaskPositionById(taskId, taskIdArray);
							//Move Elements
							moveArrayElementPosition(taskOldOrder, taskNewOrder, scope.dragDropList);
						}

					/*-- Expand options --*/
					element.find(".more-options").click(function() {
						var parentContainerId = "#drag-drop-" + $(this).attr("data-id");
						//Prevent add class functionality here while class is already applied
						//to allow inner buttons to function properly
						if(!element.find(parentContainerId).hasClass("open-option")) {
							element.find(parentContainerId).addClass("open-option");
						}
					});

					/*-- Hide Options --*/
					element.find(".option-3").click(function() {
						var parentContainerId = "#drag-drop-" + $(this).attr("data-id");
						//Prevent add class functionality here while class is not applied
						//to allow outer button to function properly
						//timeout function to separate simultaneous click events
						if(element.find(parentContainerId).hasClass("open-option")) {
							setTimeout(function() {
								element.find(parentContainerId).removeClass("open-option");
							}, 100);
						}
					});

					/*-- List Sorting --*/
					//Container configuration
					element.sortable({
						axis: 'y',
						update: function(event, ui){
							//Update Scope when an element is moved
							moveTask_scope($(ui.item).find(".drag-drop-container"));
						}
					});

				//End $timeout Function
				});
			//End app.directive.dragDropList.link
			}
		}
	//End app.directive.dragDropList
	})



})()












