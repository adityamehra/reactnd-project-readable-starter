const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false 
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false
  },
  "6ni6ok3ym7mf1p33lnaz": {
    id: '6ni6ok3ym7mf1p33lnaz',
    timestamp: 1468479767199,
    title: 'Redux Lorem Ipsum',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt, arcu vel semper blandit, nisl arcu ultricies elit, eget porta est nisl non lectus. Vivamus vitae magna in magna rutrum imperdiet tristique ut tortor. Aenean congue lacinia tellus vel tristique. Sed a orci at ipsum tempor volutpat sodales at dui. Aliquam in tempor lorem. Morbi pretium in urna non accumsan. Vivamus blandit non tellus id aliquam. Nam pharetra nisi ut eros porta pulvinar.
           Nullam in mi eget sem bibendum varius et volutpat orci. Duis viverra magna sed magna consectetur laoreet. Fusce tempor orci vel sem tempus, quis consectetur neque sodales. Praesent ultricies quis est ac rutrum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam elementum nunc vel metus fermentum, gravida pretium orci porttitor. Proin congue tincidunt quam ac scelerisque. Phasellus egestas, orci sed eleifend dapibus, ante orci condimentum velit, eget egestas neque purus sit amet sem. Nulla interdum at velit quis fringilla. Fusce suscipit tempor orci vel condimentum. Pellentesque suscipit pharetra gravida. Praesent et tempor nibh. Pellentesque ultrices lectus vitae eros faucibus, in luctus ligula gravida. Pellentesque aliquam purus in risus lobortis, a tincidunt ante pharetra.`,
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted 
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts.deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)
    
    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false
    }
     
    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll
}