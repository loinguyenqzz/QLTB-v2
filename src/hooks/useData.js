import { ref } from "vue";

export default function () {
    const data = ref([])

    const getAll = async () => {
        try {
            const response = await fetch("http://localhost:3000/employee");
            data.value = await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    const getMaxEmployeeCode = () => {
        const employeeCode = data.value.map((item) => item.employeeCode)
        const codeNumber = employeeCode.map((item) => parseInt(item.slice(4)))
        return Math.max(...codeNumber) > 0 || 0
    }

    return { data, getAll, getMaxEmployeeCode }
};
