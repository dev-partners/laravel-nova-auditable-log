import Tool from './components/Tool';

Nova.booting((Vue, router, store) => {
    Vue.component('auditable-log', Tool)
})
