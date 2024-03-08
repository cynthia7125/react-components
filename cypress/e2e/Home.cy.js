describe("Check that the page opens", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Search for a speaker", () => {
    cy.get('input[type="text"]').click().type("eve");
    cy.get("img[alt='Eve Porcello']").should("be.visible");
    cy.get('span[class="switch"]').click();
    cy.get("span[class='session w-100']").should(
      "contain",
      "React Is Your Friend: A Gentle Intro to the React Library"
    );
    cy.get("span[class='session w-100']")
      .find("strong")
      .should("contain", "Room: Town Square B");
  });
});
