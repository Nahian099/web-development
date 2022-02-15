// this variable makes sure that data is queried unnecessarily multiple times
let lock = false;

//this function gets the list of data from the backend
function get_list(offset) {

    // checker for offset parameter
    if (!offset) {
        offset =0;
    }

    fetch('http://localhost:5000/list?offset=' + offset)
    .then(response => response.json())
    .then(data => load_data(data))

}

// loading the data to the html view
function load_data(data_arr) {
    let my_html = ""

    data_arr.forEach(function (data) {

        my_html += '<div class="list-card">';
        my_html += '<h5>Name: ' + data["full_name"] + '</h5>';
        my_html += '<p>Email: ' + data["email"] +'</p>';
        my_html += '</div>';
    });

    document.querySelector('.container').insertAdjacentHTML('beforeend', my_html);

    lock= false;
}

// this fucntion implements the logic behind the infinite scrolling
window.onscroll =function () {
    if (lock) return;

    // this detects if the scroll bar has reached towards the end of the page (i.e. the scroll height of the page)
    if (this.innerHeight + this.pageYOffset >= document.body.scrollHeight) {

        // locks the data querying until the scrolling reaches towards the end of the page
        lock = true;

        // counting the number of elements of the list in already present in the hmtl view to get the offset
        let number_of_data = document.querySelectorAll('.list-card');

        get_list(number_of_data.length);
    }
}

get_list();