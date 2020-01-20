var cosmetic = {} || cosmetic;


cosmetic.drawTable = function () {
    $.ajax({
        url: "http://localhost:3000/Cosmetics",
        method: "GET",
        dataType: "json",
        success: function (data) {
            // chú ý
            var i =0;
            $('#tbCosmetic').empty();
            $.each(data, function (i, v) {
                $('#tbCosmetic').append(
                    "<tr>" +
                    "<td>" + (i+1) + "</td>" +
                    "<td>" + v.ProductName + "</td>" +
                    "<td><img src='" + v.Image + "' width='80px' height='80px'/></td>" +
                    "<td>" + v.Price + "</td>" +
                    "<td>" + v.Quantity + "</td>" +
                    "<td>" + v.ProductCode + "</td>" +
                    "<td>" + v.Brand + "</td>" +
                    "<td>" + v.Origin + "</td>" +
                    "<td>" + v.TypeProduct.Type + "</td>" +
                    "<td>" +
                    "<a href='javascript:;' class='btn btn-warning' title='Edit Product' onclick='cosmetic.get(" + v.id + ")'><i class='fa fa-edit'></i></a>" +
                    "<a href='javascript:;' class='btn btn-primary' title='Delete Product' onclick='cosmetic.delete(" + v.id + ")'><i class='fa fa-trash'></i></a>" +
                    "</td>" +
                    "</tr>"
                );
            });
            $('#myTable').DataTable();
        }
    });
};
cosmetic.save = function () {
    if ($('#formAddEditCosmetic').valid()) {
        if ($('#id').val() == 0) {
            var cosmeticObj = {};
            cosmeticObj.ProductName = $('#ProductName').val();
            cosmeticObj.Image = $('#Image').val();
            cosmeticObj.Price = $('#Price').val();
            cosmeticObj.Quantity = $('#Quantity').val();
            cosmeticObj.ProductCode = $('#ProductCode').val();
            cosmeticObj.Brand = $('#Brand').val();
            cosmeticObj.Origin = $('#Origin').val();
            var typeObj = {};
            typeObj.id = $('#TypeId').val();
            typeObj.Type = $('#TypeId option:selected').html();
            cosmeticObj.TypeProduct = typeObj;

            $.ajax({
                url: "http://localhost:3000/Cosmetics",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(cosmeticObj),
                success: function (data) {
                    $('#addEditCosmetics').modal('hide');
                    cosmetic.drawTable();
                }
            });

        }
        else {
            var cosmeticObj = {};
            cosmeticObj.ProductName = $('#ProductName').val();
            cosmeticObj.Image = $('#Image').val();
            cosmeticObj.Price = $('#Price').val();
            cosmeticObj.Quantity = $('#Quantity').val();
            cosmeticObj.ProductCode = $('#ProductCode').val();
            cosmeticObj.Brand = $('#Brand').val();
            cosmeticObj.Origin = $('#Origin').val();
            cosmeticObj.id = $('#id').val();
            var typeObj = {};
            typeObj.id = $('#TypeId').val();
            typeObj.Type = $('#TypeId option:selected').html();
            cosmeticObj.TypeProduct = typeObj;

            $.ajax({
                url: "http://localhost:3000/Cosmetics/" + cosmeticObj.id,
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(cosmeticObj),
                success: function (data) {
                    $('#addEditCosmetics').modal('hide');
                    cosmetic.drawTable();
                }
            });

        }
    }
};

cosmetic.delete = function (id) {
    bootbox.confirm({
        title: "Delete Product",
        message: "Do you want to delete product.",
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> Cancel'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Confirm'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: "http://localhost:3000/Cosmetics/" + id,
                    method: "DELETE",
                    dataType: "json",
                    success: function (data) {
                        cosmetic.drawTable();
                    }

                });
            }
        }
    });
};


cosmetic.get = function (id) {
    $.ajax({
        url: "http://localhost:3000/Cosmetics/" + id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#ProductName').val(data.ProductName);
            $('#Image').val(data.Image);
            $('#Price').val(data.Price);
            $('#Quantity').val(data.Quantity);
            $('#ProductCode').val(data.ProductCode);
            $('#Brand').val(data.Brand);
            $('#Origin').val(data.Origin);
            $('#id').val(data.id);

            var validator = $("#formAddEditCosmetic").validate();
            validator.resetForm();
            $('#addEditCosmetics').modal('show');
        }
    });
};


cosmetic.reset = function () {
    $('#ProductName').val('');
    $('#Image').val('');
    $('#Price').val('');
    $('#Quantity').val('');
    $('#ProductCode').val('');
    $('#Brand').val('');
    $('#Origin').val('');
    $('#id').val('0');
    var validator = $("#formAddEditCosmetic").validate();
    validator.resetForm();
}

cosmetic.initType = function () {
    $.ajax({
        url: "http://localhost:3000/TypeProducts",
        method: "GET",
        dataType: "json",
        success: function (data) {
            // chú ý
            $('#TypeId').empty();
            $.each(data, function (i, v) {
                $('#TypeId').append(
                    "<option value='" + v.id + "'>" + v.Type + "</option>"
                );
            });
        }
    });
}
cosmetic.openModal = function () {
    cosmetic.reset();
    $('#addEditCosmetics').modal('show');
};
cosmetic.init = function () {
    cosmetic.drawTable();
    cosmetic.initType();
};

$(document).ready(function () {
    cosmetic.init();
});