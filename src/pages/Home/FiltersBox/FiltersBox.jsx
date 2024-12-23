import styles from "./FiltersBox.module.css";
import CustomButton from "../../../components/Button/Button";
import CustomInput from "../../../components/Input/Input";
import strings from "../../../utils/strings";

export default function FiltersBox({ onHandleFiltersChange, loading }) {
    function handleFiltersChange(event) {
        event.preventDefault();
        const { name, code, department } = event.target;
        const newFilters = {
            name: name.value,
            code: code.value,
            department: strings.capitalize(department.value),
        };
        onHandleFiltersChange(newFilters);
    }

    return (
        <form className={styles.filters} onSubmit={handleFiltersChange}>
            <div className={styles.inputs}>
                <CustomInput
                    id="name"
                    name="name"
                    placeholder="Nome do produto"
                    type="text"
                />
                <CustomInput
                    id="code"
                    name="code"
                    placeholder="Código do produto"
                    type="text"
                />
                <CustomInput
                    id="department"
                    name="department"
                    placeholder="Departamento"
                    type="text"
                />
            </div>
            <div className={styles.buttons}>
                <CustomButton
                    label="Filtrar"
                    variant="filter"
                    type="submit"
                    loading={loading}
                />
                <CustomButton
                    label="Limpar"
                    variant="reset"
                    type="reset"
                    loading={loading}
                />
            </div>
        </form>
    );
}
