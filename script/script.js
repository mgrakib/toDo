// all task list 
const listOfAllTask = [
	{
		taskTitle: "I am going to do it",

		taskDescription:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aut asperiores accusantium, labore, ipsam nostrum qui provident sit veniam culpa minima ratione. Illo ipsum debitis, recusandae accusantium et assumenda quod.",

		taskDate: "2022-12-28",

		taskTime: "04:30",
	},

	{
		taskTitle: "It is top",

		taskDescription:
			"it is top task description Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aut asperiores accusantium, labore, ipsam nostrum qui provident sit veniam culpa minima ratione. Illo ipsum debitis, recusandae accusantium et assumenda quod.",

		taskDate: "2023-03-25",

		taskTime: "04:30",
	},

	{
		taskTitle: "I am going to do it",

		taskDescription:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aut asperiores accusantium, labore, ipsam nostrum qui provident sit veniam culpa minima ratione. Illo ipsum debitis, recusandae accusantium et assumenda quod.",

		taskDate: "2024-03-25",

		taskTime: "04:30",
	},

	{
		taskTitle: "I am going to do it",

		taskDescription:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aut asperiores accusantium, labore, ipsam nostrum qui provident sit veniam culpa minima ratione. Illo ipsum debitis, recusandae accusantium et assumenda quod.",

		taskDate: "2015-03-25",

		taskTime: "04:30",
	},
];



// have to do task  with valid date 
let haveToDoTask;

	



const sortDate = () => {
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
		);;
	});


	// how many work pending 
	const progressCount = document.getElementById("progress-count");
	progressCount.innerText = haveToDoTask.length;


	setFirstTopTask(haveToDoTask[0]);
	
}



// reat task and push task into all task 
const createTask = () => {
	const taskTitleValue = document.getElementById("task-title").value;
	const taskDescriptionValue = document.getElementById("task-description").value;
	const taskDateValue = document.getElementById("task-date").value;
	const taskTimeValue = document.getElementById("task-time").value;

	// console.log(taskTime, taskDescription, taskDate, taskTitle);
	
	const newArray = {
		taskTitle: taskTitleValue,
		taskDescription: taskDescriptionValue,
		taskDate: taskDateValue,
		taskTime: taskTimeValue,
	};
	
	
	

	listOfAllTask.push(newArray);

	
	
}




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



// refress for valid task 
setInterval(() => {
	sortDate();
	// console.log('done');
	
}, 1000);