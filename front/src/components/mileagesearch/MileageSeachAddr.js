import React, { Component } from 'react';

import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


class MileageSeachAddr extends Component {
  state = {
    query: '',
    results: null,
    error: null,
    addresses: [],
    boundary: null,
  };

  //카드리스트 클릭시 바로 반영되도록
  componentDidUpdate(prevProps) {
    if (prevProps.SearchKeyword !== this.props.SearchKeyword) {
      this.setState({ query: this.props.SearchKeyword });
    }
  }

  handleInputChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = async () => {
    const { query } = this.state;
    const API_ENDPOINT = 'https://map.naver.com/v5/api/search';

    try {
        const response = await fetch(`${API_ENDPOINT}?caller=pcweb&query=${encodeURIComponent(query)}&page=1&displayCount=20&isPlaceRecommendationReplace=true&lang=ko`);
        const data = await response.json();
  
        if (data.result && data.result.place) {
          const firstAddress = data.result.place.list.length > 0 ? data.result.place.list[0].address : null;
          const firstBoundary = data.result.place.boundary ? data.result.place.boundary[0] : null;
          this.setState({ 
            addresses: firstAddress, 
            boundary: firstBoundary, 
            error: null 
          });
        } else {
            this.setState({ 
              error: 'Data not found', 
              addresses: null,
              boundary: null 
            });
          }
      } catch (error) {
        this.setState({ error: 'Error fetching data', boundary: null, addresses: [] });
      }
    };
  







    render() {

      const { query, boundary, addresses, error } = this.state;
  
      return (

        <TextField 
          name="endFieldValue"
          value={this.state.query}
          onChange={(e) => this.setState({ query: this.props.SearchKeyword })}
          inputProps={{style: { height: '5px', fontSize: '12px', marginBottom:"2px" }}}
          InputProps={{ 
            style: { height: '30px', width: '130px' },
            endAdornment: (
              <InputAdornment position="end" style={{ marginRight: 0 }}>
                <IconButton 
                  color="black" 
                  size="small" 
                  sx={{ borderRadius: 0,  width: '30px', height: '30px' }}
                  onClick={this.handleSubmit}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        // <div>
        //   <input
        //     type="text"
        //     value={query}
        //     onChange={this.handleInputChange}
        //     placeholder="Search..."
        //   />
        //    <button onClick={this.handleSubmit}>Search</button>
      
        //    {addresses && (
        //       <div>
        //         <p>Address:</p>
        //         <p>{addresses}</p>
        //       </div>
        //     )}
            
        //     {boundary && (
        //       <div>
        //         <p>Boundary:</p>
        //         <p>{boundary}</p>
        //       </div>
        //     )}

        //     {error && <p>{error}</p>}
        //   </div>
      );
    }
  }
  
  export default MileageSeachAddr;