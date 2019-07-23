const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

function round() {

    if ($('.grid-item').hasClass('target')) {
        $('.grid-item')
            .removeClass('target')
            .removeClass('miss')
            .text('');
    }

    //FIXME: надо бы убрать "target" прежде чем искать новый
    let divSelector = randomDivId();
    $(divSelector)
        .addClass('target')
        // TODO: помечать target текущим номером
        .text(hits + 1)
        //FIXME: тут надо определять при первом клике firstHitTime
    if (hits === 1) {
        firstHitTime = getTimestamp();
    }

    if (hits === maxHits) {
        endGame();
    }
}

function endGame() {
    // FIXME: спрятать игровое поле сначала
    $('.game-field').hide();
    let totalPlayedMillis = getTimestamp() - firstHitTime;
    let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
    $('#total-time-played').text(totalPlayedSeconds);
    $('#win-message').removeClass("d-none");
    $('#button-reload').click(function() {
        // game-field reload
        $('.game-field').show();
        $('#win-message').addClass("d-none");
        hits = 0;
        round();
    });
};

function handleClick(event) {
    // FIXME: убирать текст со старых таргетов. Кажется есть .text?
    if ($(event.target).hasClass('target')) {
        hits = hits + 1;
        round();
        // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
    } else if ($(event.target).attr('class') === "grid-item") {
        $(event.target).addClass('miss');
    }
}

function init() {
    // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
    $('#button-reload').click(function() {
        hits = 0;
        round();
        $('.game-field').click(handleClick);
    });
}

$(document).ready(init);