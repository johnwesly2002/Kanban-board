import React, { useEffect, useState } from "react";
import { MdMoreTime } from "react-icons/md";
import { RiTimerFlashLine } from "react-icons/ri";
import { AiFillCheckCircle } from "react-icons/ai";

const useKanbanBoard = () => {
	const [Phases, setPhases] = useState({
		Todos: [],
		InProgress: [],
		Done: [],
	});
	const Fields = [
		{
			id: 1,
			title: "title",
			placeholder: "Enter title",
			ErrText: "Title should be 3 Character long",
			type: "text",
			required: true,
			Icon: MdMoreTime,
			iconProps: { color: "orange", size: 30 },
		},
		{
			id: 2,
			title: "Description",
			placeholder: "Enter Description",
			ErrText: "Title should be 5 Character long",
			type: "text",
			required: false,
			Icon: RiTimerFlashLine,
			iconProps: { color: "rgb(177, 177, 28)", size: 30 },
		},
		{
			id: 3,
			title: "Status",
			placeholder: "Select Status of Task",
			ErrText: "Select Status of Task",
			type: "dropdown",
			options: Object.keys(Phases).map((phase) => {
				return { value: phase };
			}),
			required: true,
			Icon: AiFillCheckCircle,
			iconProps: { color: "green", size: 30 },
		},
	];

	const [showModal, setShowModal] = useState(false);
	const [formData, setFormData] = useState({});
	const [draggedTaskId, setDraggedTaskId] = useState(null);

	const fetchData = async () => {
		const response = await fetch("https://jsonplaceholder.typicode.com/todos");
		const data = await response.json();
		setPhases((prev) => ({ ...prev, Todos: data }));
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleDragStart = (e, id) => {
		setDraggedTaskId(id);
	};

	const handleDrop = (e, targetPhase) => {
		e.preventDefault();
		let taskmove;
		let currentphase;

		Object.keys(Phases).forEach((phase) => {
			Phases[phase].forEach((task) => {
				if (task.id == draggedTaskId) {
					taskmove = task;
					currentphase = phase;
				}
			});
		});
		if (!taskmove || currentphase === targetPhase) return;

		const updatedPhases = { ...Phases };
		updatedPhases[currentphase] = updatedPhases[currentphase].filter(
			(task) => task.id !== draggedTaskId
		);
		updatedPhases[targetPhase] = [...updatedPhases[targetPhase], taskmove];
		setPhases(updatedPhases);
		setDraggedTaskId(null);
	};
	return {
		Phases,
		setPhases,
		showModal,
		setShowModal,
		Fields,
		draggedTaskId,
		setDraggedTaskId,
		handleDragStart,
		handleDrop,
		formData,
		setFormData,
	};
};
export default useKanbanBoard;
