import Auth from '@aws-amplify/auth';
import Analytics from '@aws-amplify/analytics';

import awsconfig from './aws-exports';

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

Vue.use(AmplifyPlugin, AmplifyModules)

const listTodos = async () => {
  console.log("listTodos");
  // Simple query
  const allTodos = await API.graphql(graphqlOperation(queries.listTodos));
  console.log(allTodos);

  // Query using a parameter
  const oneTodo = await API.graphql(graphqlOperation(queries.getTodo, { id: 'some id' }));
  console.log(oneTodo);
};

listTodos();

const addTask = async (taskName) => {
  // Mutation
  const todoDetails = {
      name: taskName,
      description: 'Learn AWS AppSync'
  };

  const newTodo = await API.graphql(graphqlOperation(mutations.createTodo, {input: todoDetails}));
  console.log(newTodo);
}

const addTaskButton = document.getElementById('AddTaskButton');

addTaskButton.addEventListener('click', (evt) => {
  addTask("from button");
});

new Vue({
  render: h => h(App)
}).$mount('#app')
