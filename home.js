// Add JavaScript code to render the charts
// Bar Chart (TWRR Performance)
const ctxBar = document.getElementById('barChart').getContext('2d');
new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: ['1 Year', '2 Years', '3 Years', '5 Years', '10 Years', 'SI - Oct 2010'],
        datasets: [
            {
                label: 'VQGrowth',
                data: [26.83, 36.75, 22.82, 32.64, 16.83, 19.31],
                backgroundColor: '#00aaff',
            },
            {
                label: 'BSE500',
                data: [27.01, 20.02, 16.85, 19.57, 13.97, 13.02],
                backgroundColor: '#fff',
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: { color: '#fff' }
            }
        },
        scales: {
            x: { ticks: { color: '#fff' } },
            y: { ticks: { color: '#fff' } }
        }
    }
});

// Line Chart (Investment Value)
// const ctxLine = document.getElementById('lineChart').getContext('2d');
// new Chart(ctxLine, {
//     type: 'line',
//     data: {
//         labels: ['1 Year', '2 Years', '3 Years', '5 Years', '10 Years', 'SI - Oct 2010'],
//         datasets: [
//             {
//                 label: 'VQGrowth',
//                 data: [26.83, 36.75, 22.82, 32.64, 16.83, 19.31],
//                 backgroundColor: '#00aaff',
//             },
//             {
//                 label: 'BSE500',
//                 data: [27.01, 20.02, 16.85, 19.57, 13.97, 13.02],
//                 backgroundColor: '#fff',
//             }
//         ]
//     },
//     options: {
//         responsive: true,
//         plugins: {
//             legend: {
//                 labels: { color: '#fff' }
//             }
//         },
//         scales: {
//             x: { ticks: { color: '#fff' } },
//             y: { ticks: { color: '#fff' } }
//         }
//     }
// });
// Get the canvas element by its ID
const ctxLine = document.getElementById('lineChart');

// Check if the canvas element is not null
if (ctxLine !== null) {
    // Create a new chart instance
    new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ['1 Year', '2 Years', '3 Years', '5 Years', '10 Years', 'SI - Oct 2010'],
            datasets: [
                {
                    label: 'VQGrowth',
                    data: [26.83, 36.75, 22.82, 32.64, 16.83, 19.31],
                    backgroundColor: '#00aaff',
                    borderColor: '#00aaff',
                    borderWidth: 2,
                    pointBackgroundColor: '#00aaff',
                    pointBorderColor: '#00aaff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointStyle: 'circle'
                },
                {
                    label: 'BSE500',
                    data: [27.01, 20.02, 16.85, 19.57, 13.97, 13.02],
                    backgroundColor: '#fff',
                    borderColor: '#fff',
                    borderWidth: 2,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointStyle: 'circle'
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: { color: '#fff' }
                }
            },
            scales: {
                x: { ticks: { color: '#fff' } },
                y: { ticks: { color: '#fff' } }
            }
        }
    });
}
let breakingImg = document.querySelector('#breakingImg')
let breakingNews_title = document.querySelector('#breakingNews .title')
let breakingNews_desc = document.querySelector('#breakingNews .description')
let topNews = document.querySelector('.topNews')
let sportsNews = document.querySelector('#sportsNews .newsBox')
let businessNews = document.querySelector('#businessNews .newsBox')
let techNews = document.querySelector('#techNews .newsBox')

let header = document.querySelector('.header')
let toggleMenu = document.querySelector('.bar')
let menu = document.querySelector('nav ul')

const toggle = (e)=>{
    toggleMenu.classList.toggle('active')
    menu.classList.toggle('activeMenu')
}

toggleMenu.addEventListener('click',toggle)



window.addEventListener('scroll',()=>{
    if(window.scrollY>50){
        header.classList.add('sticky')
    }
    else{
        header.classList.remove('sticky')
    }
})







// fetching news data from a website providing api

const apiKey = "bdd41c733d124b519cda85514324c1a1"

const fetchData = async (category,pageSize)=>{
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`
    const data = await fetch(url)
    const response = await data.json()
    console.log(response);
    return response.articles
    
}
// fetchData('general',5)

//adding breaking news

const add_breakingNews = (data)=>{
    breakingImg.innerHTML = `<img src=${data[0].urlToImage} alt="image">`
    breakingNews_title.innerHTML = `<a href=${data[0].url} target="_blank"><h2>${data[0].title}</h2></a>`
    breakingNews_desc.innerHTML = `${data[0].description}`
}
fetchData('general',5).then(add_breakingNews)

const add_topNews = (data)=>{
    let html = ''
    let title = ''
    data.forEach((element)=>{
        if (element.title.length<100){
            title = element.title
        }
        else{
            title = element.title.slice(0,100) + "..."
        }

        html += `<div class="news">
                    <div class="img">
                        <img src=${element.urlToImage} alt="image">
                    </div>
                    <div class="text">
                        <div class="title">
                        <a href=${element.url} target="_blank"><p>${title}</p></a>
                        </div>
                    </div>
                </div>`
    })
    topNews.innerHTML = html
}
fetchData('general',20).then(add_topNews)

const add_sportsNews = (data)=>{
    let html = ''
    let title = ''
    data.forEach((element)=>{
        if (element.title.length<100){
            title = element.title
        }
        else{
            title = element.title.slice(0,100) + "..."
        }

        html += `<div class="newsCard">
                    <div class="img">
                        <img src=${element.urlToImage} alt="image">
                    </div>
                    <div class="text">
                        <div class="title">
                        <a href=${element.url} target="_blank"><p>${title}</p></a>
                        </div>
                    </div>
                </div>`
    })
    sportsNews.innerHTML = html
}
fetchData('sports',5).then(add_sportsNews)
const add_businessNews = (data)=>{
    let html = ''
    let title = ''
    data.forEach((element)=>{
        if (element.title.length<100){
            title = element.title
        }
        else{
            title = element.title.slice(0,100) + "..."
        }

        html += `<div class="newsCard">
                    <div class="img">
                        <img src=${element.urlToImage} alt="image">
                    </div>
                    <div class="text">
                        <div class="title">
                        <a href=${element.url} target="_blank"><p>${title}</p></a>
                        </div>
                    </div>
                </div>`
    })
    businessNews.innerHTML = html
}
fetchData('business',5).then(add_businessNews)
const add_techNews = (data)=>{
    let html = ''
    let title = ''
    data.forEach((element)=>{
        if (element.title.length<100){
            title = element.title
        }
        else{
            title = element.title.slice(0,100) + "..."
        }

        html += `<div class="newsCard">
                    <div class="img">
                        <img src=${element.urlToImage} alt="image">
                    </div>
                    <div class="text">
                        <div class="title">
                        <a href=${element.url} target="_blank"><p>${title}</p></a>
                        </div>
                    </div>
                </div>`
    })
    techNews.innerHTML = html
}
fetchData('technology',5).then(add_techNews)