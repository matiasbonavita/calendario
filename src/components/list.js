import React from "react";
import "react-day-picker/lib/style.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import "./list.css";

import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from "react-day-picker/moment";

import "moment/locale/es";

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.addDiasObj = this.addDiasObj.bind(this);
    this.state = {
      selectedDay: undefined,
      isEmpty: true,
      isDisabled: false,
      diasObj: [],
      categoriasObj: [
        { categoria: "Trabajo", color: "#2ECC40" },
        { categoria: "Vacaciones", color: "#FF4136" },
      ],
    };
  }

  //agreegado de dias version objetos
  addDiasObj(dias, categoria) {
    this.setState({
      diasObj: [...this.state.diasObj, { dia: dias, categoria: categoria }],
    });
  }

  //comportamiento de daychange de libreria

  handleDayChange(selectedDay, modifiers, dayPickerInput) {
    const input = dayPickerInput.getInput();
    this.setState({
      selectedDay,
      isEmpty: !input.value.trim(),
      isDisabled: modifiers.disabled === true,
    });
  }

  //lista de categorias
  //borrado de dia version objetos
  handleDelete(dia) {
    var joined = this.state.dias.filter((day) => day !== dia);
    this.setState({
      diasObj: joined,
    });
  }

  //agregado de categorias y colores
  handleFormSubmit = (e) => {
    e.preventDefault();
    var joined = this.state.categorias.concat(e.target.categoria.value);
    this.setState({
      categorias: joined,
    });
    e.target.categoria.value = "";
  };

  handleFormSubmitObj = (e) => {
    e.preventDefault();
    this.setState({
      categoriasObj: [
        ...this.state.categoriasObj,
        { categoria: e.target.categoria.value, color: e.target.colors.value },
      ],
    });
    console.log(this.state.categoriasObj);
  };

  render() {
    const { selectedDay } = this.state;

    return (
      <div className="categories-wrapper">
        <div className="categories">
          <div className="categories-title">AGREGAR CATEGORÍA</div>
          <form onSubmit={this.handleFormSubmitObj}>
            <label>NOMBRE </label>
            <input type="text" name="categoria" />
            <label>COLOR </label>
            <select name="colors" id="colors">
              <option value="#0074D9">Azul</option>
              <option value="#FF4136">Rojo</option>
              <option value="#2ECC40">Verde</option>
              <option value="#B10DC9">Violeta</option>
            </select>
            <button type="submit">Agregar</button>
          </form>
        </div>
        <div className="categories-list-wrapper">
          <div className="categories-title">TUS CATEGORÍAS</div>
          <ul className="categories-loop">
            {this.state.categoriasObj.map((categoria) => (
              <li className="categories-list" style={{ color: categoria.color }}>
                <span className="categories-title-loop">
                  {categoria.categoria}
                </span>
                <DayPickerInput
                  formatDate={formatDate}
                  parseDate={parseDate}
                  format="L"
                  placeholder={`${formatDate(new Date(), "L", "es")}`}
                  dayPickerProps={{
                    locale: "es",
                    localeUtils: MomentLocaleUtils,
                  }}
                  value={this.selectedDay}
                  onDayChange={this.handleDayChange}
                  dayPickerProps={{
                    selectedDays: selectedDay,
                  }}
                />
                <button
                  onClick={() => {
                    this.props.getData(selectedDay, categoria, categoria.color);
                    this.addDiasObj(
                      selectedDay.toLocaleDateString(),
                      categoria
                    );
                  }}
                >
                  Agendar
                </button>

                <ul>
                  {this.state.diasObj.map((diaObj) => (
                    <div>
                      {categoria === diaObj.categoria ? (
                        <li>
                          {diaObj.dia}
                          <button
                            onClick={() => {
                              this.handleDelete(diaObj.dia);
                              this.props.deleteDay(selectedDay);
                            }}
                          >
                            X
                          </button>
                        </li>
                      ) : null}
                    </div>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
