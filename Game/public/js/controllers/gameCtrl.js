angular.module('gameCtrl', []).controller('gameController',  function($scope) {

    //$scope.currentPlayer = request to get player;
    $scope.playerSymbol = 'O';
    $scope.winner = null;
    $scope.buttonDisable = false;
    $scope.board =
        [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]

    $scope.cellClick = function(row, column) {
        var currentCellText = cell(row, column);
        if (currentCellText != "X" || currentCellText != "O") {
            $scope.board[row][column] = $scope.playerSymbol;
        };
        checkBoard();
    };

    $scope.cellText = function(row, column) {
        var value = cell(row, column);
        return value ? value : '-';
    };

    $scope.newGame = function() {
        $scope.winner = null;
        for (var i = 0; i < 3; i++) {
            for (var y = 0; y < 3; y++) {
                $scope.board[i][y] = null;
            }
        }
        $scope.buttonDisable = false;
    }

    function cell(row, column) {
        return $scope.board[row][column];
    };

    function checkBoard() {
        
        var winner = false;
        //Horizontal and vertical check
        for (var i = 0; i < 3; i++) {
            if(cell(i,0) && cell(i,0) == cell(i,1) && cell(i,1) == cell(i,2)){
                winner = cell(i,0);
            }
            
            if(cell(0,i) && cell(0,i) == cell(1,i) && cell(1,i) == cell(2,i)){
                winner = cell(0,i);
            }
        }
        
        //Check diagonally
        if(cell(0,0) == cell(1,1) && cell(1,1) == cell(2,2)){
            winner = cell(0,0);
        }
        
        if(cell(0,2) == cell(1,1) && cell(1,1) == cell(2,0)){
            winner = cell(0,2);
        }
        
        if(winner){
            $scope.winner = winner;
            console.log(winner);
            $scope.buttonDisable = true;
        };
    }
});