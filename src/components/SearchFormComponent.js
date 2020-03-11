import React from 'react'
import './../styles/SearchFormComponent.css'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


class SearchFormComponent extends React.Component {
    constructor(props) {
        super(props)
        this.searchInputRef = React.createRef();
      }

    searchButtonClick() {
        const text = this.searchInputRef.current.value;
        if (text && (text.trim().length !== 0)) {
          this.props.history.push(`/process?q=${text}`)
        }
    }

    render = () => (
        <div className="main_block">
          <div className="form">
            <img className="logo_main" src={`${process.env.PUBLIC_URL}/main_logo.jpg`} alt="logo_main"/>
            <h1>Сервис анализа мнений пользователей социальных сетей</h1>
            <div>
                <TextField 
                  name="query" 
                  label="Введите поисковой запрос" 
                  variant="outlined"
                  className="search_input"
                  inputRef={this.searchInputRef}/>
            </div>
            <div>
            <Button variant="contained" color="primary" className="search_button" onClick={() => this.searchButtonClick()}>
              Старт
            </Button>
            </div>
            <div className="social">
              <span>
                <img src={`${process.env.PUBLIC_URL}/vk_logo.png`} alt="VK"/>
              </span>
            </div>
          </div>
        </div>
    )
}

export default SearchFormComponent