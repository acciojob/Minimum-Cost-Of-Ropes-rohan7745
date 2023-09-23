// Function to find the minimum cost to connect ropes
function minCostToConnectRopes(arr) {
  // Create a min-heap (priority queue) to store the rope lengths
  const minHeap = new MinHeap();
  
  // Add all the rope lengths to the min-heap
  for (let length of arr) {
    minHeap.insert(length);
  }
  
  let totalCost = 0;
  
  // Merge ropes until there is only one rope left in the min-heap
  while (minHeap.size() > 1) {
    // Get the two shortest ropes
    const rope1 = minHeap.extractMin();
    const rope2 = minHeap.extractMin();
    
    // Calculate the cost of merging these two ropes
    const cost = rope1 + rope2;
    
    // Add the cost to the total cost
    totalCost += cost;
    
    // Insert the merged rope back into the min-heap
    minHeap.insert(cost);
  }
  
  return totalCost;
}

// MinHeap class to implement the priority queue
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop();
    
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown(0);
    return min;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] <= this.heap[index]) break;
      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      index = parentIndex;
    }
  }

  sinkDown(index) {
    while (true) {
      const leftChildIdx = 2 * index + 1;
      const rightChildIdx = 2 * index + 2;
      let smallest = index;

      if (leftChildIdx < this.size() && this.heap[leftChildIdx] < this.heap[smallest]) {
        smallest = leftChildIdx;
      }

      if (rightChildIdx < this.size() && this.heap[rightChildIdx] < this.heap[smallest]) {
        smallest = rightChildIdx;
      }

      if (smallest !== index) {
        [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
        index = smallest;
      } else {
        break;
      }
    }
  }
}

// Get input from the user and calculate the minimum cost
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  const inputText = document.querySelector('input[type="text"]').value;
  const ropeLengths = inputText.split(',').map(Number);
  const minCost = minCostToConnectRopes(ropeLengths);
  document.querySelector('#result').textContent = minCost;
});
