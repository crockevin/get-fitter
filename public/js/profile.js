document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault()
    const form = new FormData(this)

    try {
        const response = await fetch('/api/uploads', {
            method: 'POST',
            body: form
        })
        if (response.ok) {
            console.log('Picture uploaded')
        } else {
            console.log('Failed to upload')
        }
    } catch (error) {
        console.log(error)
    }
})

document.getElementById('dropdown').addEventListener('change', function () {
    const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${this.value}?limit=10`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c8e26b1df6msh16edc125f8b0b91p1ddadfjsn807fd6c08955',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
    }
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            const exerciseList = document.getElementById('exerciseList');
            exerciseList.innerHTML = '';

            data.forEach(exercise => {
                const li = document.createElement('li');
                li.innerHTML = `<img src="${exercise.gifUrl}" alt="Exercise Gif"><p>${exercise.name}</p>`;

                // Add a click event listener to each li
                li.addEventListener('click', () => savedClick(exercise));

                exerciseList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching exercises:', error));

    // Function to handle the click event on li elements
    function savedClick(clickedExercise) {
        fetch(`/api/workouts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                bodyPart: clickedExercise.bodyPart,
                equipment: clickedExercise.equipment,
                gifUrl: clickedExercise.gifUrl,
                id: clickedExercise.id,
                name: clickedExercise.name,
                target: clickedExercise.target,
                secondaryMuscles: clickedExercise.secondaryMuscles
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Workout created:', data);

                // Fetch and display all workouts for the specific user in the third section
                savedWorkouts(userId);
            })
            .catch(error => console.error('Error creating workout:', error));
    }
})
// Function to fetch and display all workouts for a specific user
function savedWorkouts(userId) {
    fetch(`/api/workouts/${userId}`)
        .then(response => response.json())
        .then(workouts => {
            const workoutList = document.getElementById('workoutList');
            workoutList.innerHTML = '';

            workouts.forEach(workout => {
                const li = document.createElement('li');
                li.innerHTML = `<img src="${workout.gifUrl}" alt="Exercise Gif"><p>${workout.name}</p>`;
                workoutList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching user workouts:', error));
}

function logid() {
    console.log(userId)
}
logid()
savedWorkouts(userId)
