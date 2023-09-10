function calculateMinCost() {
            const ropeInput = document.getElementById('ropeInput').value;
            const ropeLengths = ropeInput.split(',').map(Number);

            if (ropeLengths.length < 2) {
                document.getElementById('result').innerText = 'Please enter at least two rope lengths.';
                return;
            }

            // Create a min-heap using a priority queue
            const priorityQueue = new MinHeap();

            // Add rope lengths to the priority queue
            for (const length of ropeLengths) {
                priorityQueue.insert(length);
            }

            let totalCost = 0;

            // Merge ropes until there's only one left
            while (priorityQueue.size() > 1) {
                const rope1 = priorityQueue.extractMin();
                const rope2 = priorityQueue.extractMin();
                const combinedLength = rope1 + rope2;
                totalCost += combinedLength;
                priorityQueue.insert(combinedLength);
            }

            document.getElementById('result').innerText = 'Minimum cost of ropes: ' + totalCost;
        }

        // MinHeap implementation
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

            bubbleUp(index) {
                while (index > 0) {
                    const parentIndex = Math.floor((index - 1) / 2);
                    if (this.heap[parentIndex] <= this.heap[index]) {
                        break;
                    }
                    this.swap(index, parentIndex);
                    index = parentIndex;
                }
            }

            extractMin() {
                if (this.size() === 0) {
                    return null;
                }

                if (this.size() === 1) {
                    return this.heap.pop();
                }

                const min = this.heap[0];
                this.heap[0] = this.heap.pop();
                this.sinkDown(0);
                return min;
            }

            sinkDown(index) {
                while (true) {
                    const leftChildIndex = 2 * index + 1;
                    const rightChildIndex = 2 * index + 2;
                    let smallestChildIndex = index;

                    if (leftChildIndex < this.size() && this.heap[leftChildIndex] < this.heap[smallestChildIndex]) {
                        smallestChildIndex = leftChildIndex;
                    }

                    if (rightChildIndex < this.size() && this.heap[rightChildIndex] < this.heap[smallestChildIndex]) {
                        smallestChildIndex = rightChildIndex;
                    }

                    if (smallestChildIndex === index) {
                        break;
                    }

                    this.swap(index, smallestChildIndex);
                    index = smallestChildIndex;
                }
            }

            swap(a, b) {
                const temp = this.heap[a];
                this.heap[a] = this.heap[b];
                this.heap[b] = temp;
            }
        }