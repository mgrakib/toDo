// all task list 
const listOfAllTask = [
	{
		id: 1,
		taskTitle: "I am going to do it",

		taskDescription:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aut asperiores accusantium, labore, ipsam nostrum qui provident sit veniam culpa minima ratione. Illo ipsum debitis, recusandae accusantium et assumenda quod.",

		taskDate: "2022-12-28",

		taskTime: "04:30",
	},

	{
		id: 2,
		taskTitle: "It is top",

		taskDescription:
			"it is top task description Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aut asperiores accusantium, labore, ipsam nostrum qui provident sit veniam culpa minima ratione. Illo ipsum debitis, recusandae accusantium et assumenda quod.",

		taskDate: "2023-03-25",

		taskTime: "04:30",
	},

	{
		id: 3,
		taskTitle: "I am going to do it",

		taskDescription:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aut asperiores accusantium, labore, ipsam nostrum qui provident sit veniam culpa minima ratione. Illo ipsum debitis, recusandae accusantium et assumenda quod.",

		taskDate: "2024-03-25",

		taskTime: "04:30",
	},

	{
		id: 4,
		taskTitle: "I am going to do it",

		taskDescription:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aut asperiores accusantium, labore, ipsam nostrum qui provident sit veniam culpa minima ratione. Illo ipsum debitis, recusandae accusantium et assumenda quod.",

		taskDate: "2015-03-25",

		taskTime: "04:30",
	},
];



// have to do task  with valid date 
let haveToDoTask;

// incomplete array
let incomplete;

// complete array
let complete = [
	
];


// left array 
const leftArrayis = [];

const leftArrayFunction = () => {
	for (let i = 0; i < listOfAllTask.length; i++) {
		let match = false;
		for (let j = 0; j < complete.length; j++) {
			if (listOfAllTask[i].id === complete[j].id) {
				match = true;
				break;
			}
		}
		if (!match) {
			leftArrayis.push(listOfAllTask[i]);
		}
	}

	
	
}



const sortDate = () => {
	// invalid Array list
	const inValidDate = listOfAllTask.filter(task => {
		const datetimeString = `${task.taskDate}T${task.taskTime}`;
		const nowTimeValue = new Date().getTime();
		const taskTimeValue = new Date(datetimeString).getTime();

		return taskTimeValue < nowTimeValue;
	});

	incomplete = [...inValidDate];

	incomplete.sort((first, second) => {
		const datetimeStringFirst = `${first.taskDate}T${first.taskTime}`;
		const datetimeStringSecond = `${second.taskDate}T${second.taskTime}`;
		return (
			new Date(datetimeStringSecond).getTime() -
			new Date(datetimeStringFirst).getTime()
		);
	});


	// Valid Array list
	const validDate = listOfAllTask.filter(task => {
		const datetimeString = `${task.taskDate}T${task.taskTime}`;
		const nowTimeValue = new Date().getTime();
		const taskTimeValue = new Date(datetimeString).getTime();

		return nowTimeValue < taskTimeValue;
	});

	haveToDoTask = [...validDate];
	// have to do task sort
	haveToDoTask.sort((first, second) => {
		const datetimeStringFirst = `${first.taskDate}T${first.taskTime}`;
		const datetimeStringSecond = `${second.taskDate}T${second.taskTime}`;

		return (
			new Date(datetimeStringFirst).getTime() -
			new Date(datetimeStringSecond).getTime()
		);
	});

	// how many work pending
	const progressCount = document.getElementById("progress-count");
	progressCount.innerText = haveToDoTask.length;

	setFirstTopTask(haveToDoTask[0]);
}


// refress for valid task 
setInterval(() => {
	sortDate();
	setIncomplete();
}, 1000);



// reat task and push task into all task 
const createTask = () => {
	const taskTitleValue = document.getElementById("task-title").value;
	const taskDescriptionValue = document.getElementById("task-description").value;
	const taskDateValue = document.getElementById("task-date").value;
	const taskTimeValue = document.getElementById("task-time").value;

	// console.log(taskTime, taskDescription, taskDate, taskTitle);
	
	const nowDateTime = new Date().getTime();
	const inputDateTime = new Date(
		`${taskDateValue}T${taskTimeValue}`
	).getTime();

	// every task id
	const taskId = listOfAllTask.length + 1;
	
	if (nowDateTime > inputDateTime) {
		alert('You cant set Backdate time')
	} else {
		const newArray = {
			id : taskId,
			taskTitle: taskTitleValue,
			taskDescription: taskDescriptionValue,
			taskDate: taskDateValue,
			taskTime: taskTimeValue,
		};

		listOfAllTask.push(newArray);
	}
}


// set vale to first top task 
const setFirstTopTask = (task) => {
	// object destructuring 
	const { taskTitle, taskDescription, taskDate, taskTime } = task;
	// toptask title 
	const topTaskTitle = document.getElementById("top-task-title");
	topTaskTitle.innerText = task.taskTitle;

	// toptask description
	const topTaskDescription = document.getElementById("top-task-description");
	topTaskDescription.innerText = taskDescription.slice(0,100) + "...";

	// task date and time
	const topTaskDateTime = document.getElementById("top-task-DateTime");
	const taskDateTimeString = `${taskDate}T${taskTime}`;
	topTaskDateTime.innerText = new Date(taskDateTimeString).toLocaleString();
}


// view all task 
const viewAllTask = () => {
	
	const allTaskModalContainer = document.getElementById(
		"allTask-modal-container"
	);
	allTaskModalContainer.innerHTML = '';

	haveToDoTask.forEach(element => {
		const { taskTitle, taskDate, taskTime, taskDescription, id } = element;
		
		const taskTimeDate = new Date( 
			`${taskDate}T${taskTime}`
		).toLocaleString();

		const section = document.createElement("section");
		section.classList =
			"bg-[#FFFFFF] p-4 rounded-lg shadow-[0_0_5px_1px_rgba(0,0,0,.6)] relative overflow-hidden mb-5";

		section.innerHTML = `<div class="flex justify-between items-center pb-5">
                    <div>
                        <h4 class="text-xl text-gray-700 font-bold" id="top-task-title">${taskTitle}</h4>
                        <p id="top-task-DateTime">${taskTimeDate}</p>
                    </div>
                    <div>
                        <div class="w-[50px] h-[50px] flex justify-center items-center bg-blue-200 rounded-full cursor-pointer"><i onclick='allClassShow(${id})'  class="fa-regular fa-square-check completeCheck"></i></div>
                    </div>
                </div>

                <!-- top description start  -->
                <div class="border-t py-4">
                    <p class="text-gray-500">Description:</p>
                    <p id="top-task-description" class="text-gray-900">${taskDescription}</p>
                </div>
                <!-- top description start  -->
                <div class="flex justify-between items-center">
                    <div>
                        <p>Teams:</p>
                        <div>
                            <div class="avatar-group -space-x-3">
                                <div class="avatar">
                                    <div class="w-[30px]">
                                    <img src="./image/dp.png" />
                                    </div>
                                </div>
                                <div class="avatar">
                                    <div class="w-[30px]">
                                    <img src="./image/dp.png" />
                                    </div>
                                </div>
                               
                                </div>
                        </div>
                    </div>
                    <div>
                        <div class="radial-progress text-blue-600" style="--value:70; --size:40px; --thickness: 4px;">70%</div>
                    </div>
                </div>
                <div class="w-full h-[10px] bg-blue-600 absolute left-0 -bottom-1">
                </div>`;
		
		
		allTaskModalContainer.appendChild(section);
	});
	
	
};


// set incomplete task 
const setIncomplete = () => {
	const incompleteTaskContainer = document.getElementById(
		"incomplete-task-container"
	);
	incompleteTaskContainer.innerHTML = '';

	incomplete.forEach(element => {
		const { taskTitle, taskTime, taskDate, taskDescription } = element;
		const taskDateTimeString = `${taskDate}T${taskTime}`;
		const div = document.createElement('div');
		div.classList =
			"p-5 mb-5 shadow-[0_0_5px_1px_rgba(0,0,0,.6)] rounded-lg";
		div.innerHTML = `<div class="flex justify-between items-center">
                                <div>
                                    <p class="text-lg font-bold"><s>${taskTitle}</s></p>
                                    <p class="text-gray-500">${taskDescription.slice(0,50)}...</p>
                                </div>
                                <div class="flex justify-center items-center text-xl text-blue-600">
                                    <i class="fa-solid fa-circle-check"></i>
                                </div>
                            </div>
                            <div class="my-4 pt-4 border-t flex justify-between items-center">
                                <div><p>${new Date(
									taskDateTimeString
								).toLocaleString()}</p></div>
                                <div>
                                    <div class="avatar-group -space-x-2">
                                        <div class="avatar">
                                            <div class="w-[30px]">
                                            <img src="./image/dp.png" />
                                            </div>
                                        </div>
                                        </div>
                                </div>
                            </div>`;
		
		incompleteTaskContainer.appendChild(div);
	});
	
}






const allClassShow = (id) => {
	
	haveToDoTask.forEach(element => {
		if (element.id === id) {
			complete.push(element);
		}
	});
	
	complete.sort((first, second) => {
		const datetimeStringFirst = `${first.taskDate}T${first.taskTime}`;
		const datetimeStringSecond = `${second.taskDate}T${second.taskTime}`;
		return (
			new Date(datetimeStringSecond).getTime() -
			new Date(datetimeStringFirst).getTime()
		);
	});

	setComplete();
	
	// console.log(id);
}



// set complete task 
const setComplete = () => {
	const completeTaskContainer = document.getElementById(
		"complete-task-container"
	);
	completeTaskContainer.innerHTML = "";

	complete.forEach(element => {
		const { taskTitle, taskTime } = element;
		const div = document.createElement("div");
		div.classList =
			"p-5 mb-5 shadow-[0_0_5px_1px_rgba(0,0,0,.6)] rounded-lg";
		div.innerHTML = `<div class="flex justify-between items-center">
                                <div>
                                    <p class="text-lg font-bold"><s>${taskTitle}</s></p>
                                    <p class="text-gray-500">I am on the way to achiv my goal....</p>
                                </div>
                                <div class="flex justify-center items-center text-xl text-blue-600">
                                    <i class="fa-solid fa-circle-check"></i>
                                </div>
                            </div>
                            <div class="my-4 pt-4 border-t flex justify-between items-center">
                                <div><p>28 Dec 2022</p></div>
                                <div>
                                    <div class="avatar-group -space-x-2">
                                        <div class="avatar">
                                            <div class="w-[30px]">
                                            <img src="./image/dp.png" />
                                            </div>
                                        </div>
                                        </div>
                                </div>
                            </div>`;

		completeTaskContainer.appendChild(div);
	});
};
