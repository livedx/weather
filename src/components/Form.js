import React from "react";

class Form extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.weatherMetod}>
                <input type="text" name="city" placeholder="Город"/>
                <button type='submit'>Получить погоду</button>
            </form>
        )
    }
}
export default Form;