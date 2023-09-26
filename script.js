function minCostOfRopes(arr) {
  // Create a min-heap using a priority queue
  const priorityQueue = new MinPriorityQueue();

  // Insert all the rope lengths into the priority queue
  for (const length of arr) {
    priorityQueue.enqueue(length, length);
  }

  let totalCost = 0;

  // Continue until there is only one rope left in the priority queue
  while (priorityQueue.size() > 1) {
    // Dequeue the two smallest ropes
    const rope1 = priorityQueue.dequeue().element;
    const rope2 = priorityQueue.dequeue().element;

    // Calculate the cost of connecting them
    const cost = rope1 + rope2;

    // Enqueue the combined rope back into the priority queue
    priorityQueue.enqueue(cost, cost);

    // Add the cost to the total cost
    totalCost += cost;
  }

  return totalCost;
}

// Function to handle form submission
function handleSubmit() {
  const inputElement = document.getElementById('ropeLengths');
  const resultElement = document.getElementById('result');

  // Get the input value and split it into an array of integers
  const inputText = inputElement.value;
  const ropeLengths = inputText.split(',').map(str => parseInt(str.trim(), 10));

  // Calculate the minimum cost
  const minCost = minCostOfRopes(ropeLengths);

  // Display the result in the resultElement
  resultElement.textContent = `Minimum Cost: ${minCost}`;
}

// Event listener for form submission
const form = document.getElementById('ropeForm');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  handleSubmit();
});
