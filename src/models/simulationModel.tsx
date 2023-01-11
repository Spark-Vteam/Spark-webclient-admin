const simulation = {
  stopSpecificBike: async function stopSpecificBike(id: string) {
    const response = await fetch(`http://localhost:8000/stop/${id}`);

    const res = await response.json();

    return res;
  },
  start: async function start() {
    const response = await fetch('http://localhost:8000/sim_start');

    const res = await response.json();

    return res;
  },
  stop: async function stop() {
    const response = await fetch('http://localhost:8000/sim_stop');

    const res = await response.json();

    return res;
  },
};

export default simulation;
