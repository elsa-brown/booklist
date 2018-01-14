import React, { Component } from 'react';

class AddItemFormContainer extends Component {
	constructor() {
		super()
		this.state = {
			title: 'Title',
			author: 'Author',
			link: '',
		}
	}

	render() {
		return (
	    <form className="itemInput" id="itemform">
	      <input type="text" name="title" placeholder="Title" onKeyUp={handleKeyUp} />
	      <input type="text" name="author" placeholder="Author" onKeyUp={handleKeyUp} />
	      <input type="url" name="url" placeholder="link" onKeyUp={handleKeyUp} />
	      <button>Add</button>
	      <select form="itemform">
	        <option value="have">Move To Have</option>
	        <option value="read">Move To Read</option>
	      </select>
	      <button>Move</button>
	    </form>
  );
	}

}