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