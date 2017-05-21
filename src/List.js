import React, { Component } from 'react';
import Tags from './Tags.js';
import Books from './Books.js';
import { Grid, Image, Label, Dropdown, Icon, Checkbox } from 'semantic-ui-react'
import BookTags from './BookTags.js';
// import { Grid, Image, Label, Dropdown, Icon } from 'semantic-ui-react'
import './App.css';
import * as moment from 'moment';
import { Link } from 'react-router-dom';

class List extends Component {
  state = {
    // isChecked: false,
}
  constructor(props) {
    super(props);
    this.checkBooked = this.checkBooked.bind(this);
    this.getUserTagByName = this.getUserTagByName.bind(this);
  }

  checkBooked(e, data, news){
    console.log("checked", data, e, news);
    // this.setState({isChecked: !this.state.isChecked});
    if(data.checked){
      let allData = this.props.userArticle || [];
      this.props.newsActionsTemp.adduserArticle({userId: this.props.selectedBook, newsId: news._id, order: 1 });
    }else{
      // this.props.find
      console.log("this.props.userArticle", this.props.userArticle);
      const selectedArtices = this.props.userArticle;
      // const temp = this.props.userArticle.map(x=> {console.log(x); return 1});
      for (var tempProps in selectedArtices) {
        console.log(`this.props.userArticle.${tempProps} `,selectedArtices[tempProps]);

        if(selectedArtices[tempProps].userId == this.props.selectedBook && selectedArtices[tempProps].newsId == news._id){
          console.log("Found", tempProps);
          this.props.newsActionsTemp.removeUserArticle(tempProps);
        }
      }
      // this.prps.newsActionsTemp.removeUserArticle();
    }
  }
  getUserTagByName(d){
    const userbookTags = d.userBooks? d.userBooks.map((x) => {
      return this.props.userBooks.filter(y => y._id === x)[0].fullName;
    }) : [];
    console.log("userbookTags", userbookTags)
    return userbookTags;
  }
  render() {
    let items = this.props.items;
    let userArticle = Object.keys(this.props.userArticle).map(key => this.props.userArticle[key]) || [];
    const newsActions = this.props.newsActionsTemp;
    let feedback = null;
    if (this.props.activeItem === 'yesterday') {
      let options = [
        {
          key: 1,
          value: 'good',
          text: 'Useful',
          content: <Icon name='smile' color='green'/>
        },
        {
          key: 2,
          value: 'meh',
          text: 'Meh',
          content: <Icon name='meh' color='grey'/>
        },
        {
          key: 3,
          value: 'bad',
          text: 'Useless',
          content: <Icon name='frown' color='red'/>
        }
      ];
      feedback = (
        <Dropdown style={{float: 'right'}} selection options={options} placeholder='Feedback' />
      );
    }

    const userBooks = this.props.userBooks;
    let now = moment();

    return (
      <Grid celled>
        {items.map((d,i) => {
          const userbookTags = d.userBooks? d.userBooks.map((x) => {
            return userBooks.filter(y => y._id === x)[0].fullName;
          }) : [];
          // console.log("news", d._id, "userbooks", d.userBooks, userbookTags);
          return (
            <Grid.Row key={`grid-item-${i}`}>
              <Grid.Column width={3}>
                <Image src={d.urlToImage}/>
              </Grid.Column>
              <Grid.Column width={13}>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Label as='a' color={now.diff(moment(d.publishedAt), 'hours') > 24 ? 'grey' : 'red'} ribbon>{d.title}</Label>
                  </Grid.Column>
                  {(this.props.selectedBook&& d.userBooks.indexOf(this.props.selectedBook) > -1 ) &&
                    <Grid.Column>
                      <Checkbox
                        checked={userArticle.filter((v,i,k) => { console.log(v.newsId , d._id , v.userId  , this.props.selectedBook ); return v.newsId === d._id&& v.userId === this.props.selectedBook;}).length > 0}
                        label={{ children: 'Select' }}
                        onChange={(e,data) => this.checkBooked(e, data ,d)} />
                    </Grid.Column>
                  }
                </Grid.Row>

                {feedback}
                <p>{moment(d.publishedAt).fromNow()}</p>
                <p><Link to={"/main/"+ d._id}>{d.description}</Link></p>
                <Tags key={`tags-$i`} icon={'tags'}
                  tags={d.tags}
                  item={d}
                  itemPropsName={'tags'}
                  updateTags={newsActions.updateNews}/>


                <BookTags key={`users-$i`} icon={'user circle outline'}
                  tags={userbookTags}
                  item={d}
                  options={userBooks}
                  itemPropsName={'userBooks'}
                  updateTags={newsActions.updateNews}/>
              </Grid.Column>
            </Grid.Row>
          );
        })}
      </Grid>
    );
  }
}

export default List;
