import React, { useEffect, useState } from "react";
import "./styles.css";
import { TbLibraryPlus } from "react-icons/tb";
import Modal from "../components/Modal/Modal";
import { GoGrabber } from "react-icons/go";
import useKanbanBoard from "./useKanbanBoard";
export default function KanbanBoard() {
	const {
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
	} = useKanbanBoard();

	return (
		<div className="mainContainer">
			<h2>Kanban Board</h2>
			<div className="Kandan-Container">
				<div>
					<div className="AddTask" onClick={() => setShowModal(true)}>
						Add New Task <TbLibraryPlus />
					</div>
				</div>
				<div className="Phases">
					{Object.keys(Phases).map((phase, index) => {
						const IconComponent = Fields[index]?.Icon;
						return (
							<div
								className="PhasesColumn"
								key={phase}
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => handleDrop(e, phase)}
							>
								<div className="Phase-title">
									<h3 className="Phase-heading">
										{IconComponent && (
											<IconComponent {...Fields[index].iconProps} />
										)}{" "}
										{phase}
									</h3>
								</div>
								{Phases[phase].length == 0 ? (
									<div>No Tasks Avaiable</div>
								) : (
									Phases[phase].map((task) => (
										<div
											key={task.id}
											className="task"
											draggable
											onDragStart={(e) => handleDragStart(e, task.id)}
										>
											<div className={`task-title + ${phase}`}>
												{phase} Task
											</div>
											<div className="task-content">
												<div>{task.title}</div>
												<GoGrabber size={30} />
											</div>
										</div>
									))
								)}
							</div>
						);
					})}
				</div>
			</div>
			{showModal && (
				<Modal
					formData={formData}
					setFormData={setFormData}
					Fields={Fields}
					setShowModal={setShowModal}
					setPhases={setPhases}
				/>
			)}
		</div>
	);
}
