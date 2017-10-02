$(document).ready(function () {
    buttonClick()
    loadBooks()
});

function buttonClick()
{
    $('#btnSendText').click(function(e){
        e.preventDefault();
        var message = $("#exampleTextarea").val();
        // console.log(message)
        // message = message.replace(/\W/g, ' ')
        // console.log(message)
        $.ajax({
            type: "GET",
            url: 'api/search/',
            data: {'d' : message},
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function(data){processSearchResults(data)},
        });

    });
}

function processSearchResults(data){

    $("#searchResultList").empty()
    data.forEach(function(info, index){
        $("#searchResultList").append('<div class="row article" style="display:none">🔗 <a href="">'+info.text+'</a></div>');
        $("#searchResultList").children().fadeIn(800)
    })
}

function loadBooks()
{
    $.ajax({
        url: "api/books/1",
        success: function (payload){processTopics(payload)},
    });
}


function processTopics(topics) {
    topics.forEach(function(topic, index){ generate_view(topic, index)})
}

function generate_view(topic, index) {
    console.log(topic, index);

    var topic_words = topic.topics.map(function (x) {
            return x;
        });
    $("#topiclist").append('<div class="topic row" style="background-color: rgba(255,'+ ((index * 255 / 20) | 0) + ',0,1)" id="'+index+'"><div class="left">'+index+'</div><div class="right">'+topic_words.join(", ")+'</div></div>')

    $("#"+index).click(function () {
        loadUrls(topic.objects, topic_words)
        $(this).parent().children().removeClass("activate");
        $(this).addClass("activate")
    })
}

function loadUrls(articles, topics) {
    $("#articlelist").empty()
    articles.forEach(function(article){
        $("#articlelist").append('<div class="row article" style="display:none">🔗 <a href="">'+article.title+'</a></div>');
        $("#articlelist").children().fadeIn(800)
    })

}