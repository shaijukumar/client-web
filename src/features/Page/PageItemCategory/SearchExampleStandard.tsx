import _ from 'lodash'
//import faker from 'faker'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment, SearchProps } from 'semantic-ui-react'

const initialState = { isLoading: false, results: [], value: '' }

// const source = _.times(5, () => ({
//     title: faker.company.companyName(),
//     description: faker.company.catchPhrase(),
//     image: faker.internet.avatar(),
//     price: faker.finance.amount(0, 100, 2, '$'),
//   }))

const source1 =  [[{
    title: "aaa",
    description:  "aaa",
    image:  "aaa",
    price: "10",
  }],
  [{
    title: "aaa",
    description:  "aaa",
    image:  "aaa",
    price: "10",
  }]]


  const source =  [{
    title: "aaa",
    name:"aaa11",
    description:  "aaa11",
    image:  "aaa",
    price: "10",
  },
  {
    title: "bbbbaaa",
    name:"bbbb11",
    description:  "aaa",
    image:  "aaa",
    price: "10",
  },
  {
    title: "ccccaa",
    name:"bbbb11",
    description:  "aaa",
    image:  "aaa",
    price: "10",
  },
  {
    title: "dddda",
    name:"bbbb11",
    description:  "aaa",
    image:  "aaa",
    price: "10",
  },
  {
    title: "eeee",
    name:"bbbb11",
    description:  "aaa",
    image:  "aaa",
    price: "10",
  }];

export default class SearchExampleStandard extends Component {
    state = initialState
    
    
    handleResultSelect = (e:React.MouseEvent<HTMLElement, MouseEvent>, result:SearchProps) => {
            debugger;
            console.log(result.result.name);
            this.setState({ value: result.result.name })
        }

    handleSearchChange = (e:React.MouseEvent<HTMLElement, MouseEvent>,  searchProps:SearchProps ) => {
        debugger;

        const value:string = searchProps.value ? searchProps.value : '';
        

        this.setState({ isLoading: true, value  })

    setTimeout(() => {
        if (this.state.value.length < 1) return this.setState(initialState)

        const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
        const isMatch = (result:SearchProps) => re.test(result.title)

        this.setState({
        isLoading: false,
        results:_.filter(source, isMatch),   // source //  
        })

        console.log( this.state.results );
    }, 300)
    }
 
    render() {

        const { isLoading, value, results } = this.state
        
        return (
          <Grid>
            <Grid.Column width={6}>
              <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                  leading: true
                })}
                results={results}
                value={value}
              //{...this.props}
              />
            </Grid.Column>

          </Grid>
        )
    }
}

