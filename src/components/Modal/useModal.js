import { useState } from "react";

const useModal = ({
	Fields,
	formData,
	setFormData,
	setShowModal,
	setPhases,
}) => {
	const [showoption, setShowoption] = useState(false);
	const [showErrText, setShowErrText] = useState({});

	const validate = (formData) => {
		const requiredFields = Fields.filter((field) => field.required === true);
		let hasError = false;

		requiredFields.forEach((field) => {
			const res = formData[field.title];
			if (!res) {
				setShowErrText((prev) => ({ ...prev, [field.title]: true }));
				hasError = true;
			}
		});

		return !hasError;
	};

	const handleAddTask = () => {
		if (validate(formData)) {
			setShowModal(false);
			setPhases((prev) => ({
				...prev,
				[formData.Status]: [
					...prev[formData.Status],
					{ ...formData, id: Date.now() },
				],
			}));
			setFormData({
				title: "",
				Description: "",
				Status: "",
			});
		}
	};

	const handleChange = (field, e) => {
		const value = e.target.value;

		setFormData((prev) => {
			if (prev[field.title] === value) return prev;

			return {
				...prev,
				[field.title]: value,
			};
		});
		setShowErrText((prev) => {
			if (!prev[field.title]) return prev;
			return {
				...prev,
				[field.title]: false,
			};
		});
	};

	return {
		showoption,
		setShowoption,
		showErrText,
		handleAddTask,
		handleChange,
	};
};

export default useModal;
