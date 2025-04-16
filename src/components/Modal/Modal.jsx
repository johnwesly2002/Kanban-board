import React, { useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import "./styles.css";
import useModal from "./useModal";
export default function Modal({
	setShowModal,
	Fields,
	formData,
	setFormData,
	setPhases,
}) {
    const {
        showoption,
        setShowoption,
        showErrText,
        handleAddTask,
        handleChange,
    } = useModal({ Fields, formData, setFormData, setShowModal, setPhases });
    

	return (
		<div className="Modal-Overlay">
			<div className="Modal-Container">
				<div className="Modal-Title">
					Add New Task <RiCloseLargeFill className="closeIcon" onClick={() => setShowModal(false)} />
				</div>
				<div className="Modal-Content">
					<form>
						{Fields.map((field, index) => (
							<div key={index} className="Task-inputContainer">
								<label>{field.title}</label>
								{field.type == "text" && (
									<input
										className="Task-input"
										type={field.type}
										value={formData[field.title]}
										placeholder={field.placeholder}
										onChange={(e) => handleChange(field, e)}
										required={field.required}
									/>
								)}
								{field.type == "dropdown" && (
									<div className="dropdown-input">
                                    <select
                                      className="Task-input"
                                      value={formData?.[field.title] || ""}
                                      onChange={(e) => {
                                        setFormData((prev) => ({
                                          ...prev,
                                          [field.title]: e.target.value,
                                        }));
                                      }}
                                      onFocus={() => setShowoption(true)} 
                                      onBlur={() => setShowoption(false)}
                                    >
                                      <option value="" disabled hidden>
                                        {field.placeholder} 
                                      </option>
                                      {field.options.map((option) => (
                                        <option key={option.value} value={option.value}>
                                          {option.value}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
								)}
								{showErrText?.[field.title] && (
									<span className="errorText">{field.ErrText}</span>
								)}
							</div>
						))}
					</form>
				</div>
				<div className="Modal-footer">
					<div className="AddTask" onClick={() => handleAddTask()}>
						Add New Task
					</div>
				</div>
			</div>
		</div>
	);
}
