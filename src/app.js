import Auth from '@aws-amplify/auth';
import Analytics from '@aws-amplify/analytics';

import awsconfig from './aws-exports';
import aws_exports from './aws-exports'

// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig);
// send analytics events to Amazon Pinpoint
Analytics.configure(awsconfig);

const AnalyticsResult = document.getElementById('AnalyticsResult');
const AnalyticsEventButton = document.getElementById('AnalyticsEventButton');
let EventsSent = 0;
AnalyticsEventButton.addEventListener('click', (evt) => {
    Analytics.record('AWS Amplify Tutorial Event')
        .then( (evt) => {
            const url = 'https://console.aws.amazon.com/pinpoint/home/?region=us-east-1#/apps/'+awsconfig.aws_mobile_analytics_app_id+'/analytics/events';
            AnalyticsResult.innerHTML = '<p>Event Submitted.</p>';
            AnalyticsResult.innerHTML += '<p>Events sent: '+(++EventsSent)+'</p>';
            AnalyticsResult.innerHTML += '<a href="'+url+'" target="_blank">View Events on the Amazon Pinpoint Console</a>';
        });
});

import Amplify, { API, graphqlOperation } from "aws-amplify";
Amplify.configure(awsconfig);
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import { AmplifyPlugin } from 'aws-amplify-vue'
Amplify.configure(aws_exports)

var app = new Vue({
  el: '#app',
  data: {
    todos: []
  }
})

const listTodos = async () => {
  console.log("listTodos");
  // Simple query
  const res = await API.graphql(graphqlOperation(queries.listTodos, {limit: 100}));
  console.log(res.data.listTodos.items);

  app.todos = res.data.listTodos.items;
};

listTodos();

const insertTask = async (taskName) => {
  // Mutation
  const todoDetails = {
      name: taskName,
      description: '🍣'
  };

  const newTodo = await API.graphql(graphqlOperation(mutations.createTodo, {input: todoDetails}));
  listTodos();
}


var newTask = new Vue({
  el: '#new-task',
  data: {
    name: "sushi"
  },
  methods: {
    addTask: function() {
      insertTask(this.name);
    }
  }
})

//Vue.use(AmplifyPlugin, AmplifyModules)
