describe('firebaseHelper', function() {

  it("updateFireBase updates the firebase database with a new latitude and longitude", function() {
    var firebaseRoom = {
      set: function() {}
    }
    spyOn(firebaseRoom, "set")
    spyOn(firebaseHelper, "createFireBase").and.returnValue(firebaseRoom)

    firebaseHelper.updateFireBase('foobar', {latitude: '232.39', longitude: '123.4'})

    expect(firebaseRoom.set).toHaveBeenCalledWith({latitude: '232.39', longitude: '123.4'})
    expect(firebaseHelper.createFireBase).toHaveBeenCalledWith('foobar')
  })

});