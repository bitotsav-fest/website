import React from "react";
import { saveAs } from "file-saver";
import { utils, writeFile } from "xlsx";
import { Parser } from "json2csv";

const ExportData = ({ responseData, isDataFetched }) => {
  if (!isDataFetched || !responseData) return null;

  const displayedData = {
    eventName: responseData.eventName,
    eventClub: responseData.eventClub,
    eventVenue: responseData.eventVenue,
    eventTime: responseData.eventTime,
    teamsRegistered: responseData.teamsRegistered?.map(({ teamName, leaderName, leaderMobileNumber, rollNumber }) => ({
      teamName,
      leaderName,
      leaderMobileNumber,
      rollNumber,
    })),
    eventRegistrarList: responseData.eventRegistrarList?.map(({ name, rollNumber, mobileNumber }) => ({
      name,
      rollNumber,
      mobileNumber,
    })),
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(displayedData, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "eventData.json");
  };

  const exportCSV = () => {
    const eventFields = ["eventName", "eventClub", "eventVenue", "eventTime"];
    const teamsFields = ["teamName", "leaderName", "leaderMobileNumber", "rollNumber"];
    const registrarFields = ["name", "rollNumber", "mobileNumber"];

    const eventParser = new Parser({ fields: eventFields });
    const teamsParser = new Parser({ fields: teamsFields });
    const registrarsParser = new Parser({ fields: registrarFields });

    const csvData =
      eventParser.parse([displayedData]) +
      "\n\nTeams Registered\n" +
      (displayedData.teamsRegistered?.length ? teamsParser.parse(displayedData.teamsRegistered) : "No teams registered") +
      "\n\nRegistrars\n" +
      (displayedData.eventRegistrarList?.length ? registrarsParser.parse(displayedData.eventRegistrarList) : "No registrars");

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "eventData.csv");
  };

  const exportExcel = () => {
    const wb = utils.book_new();
  
    // Format Event Details
    const eventData = [{
      "Event Name": responseData.eventName,
      "Club": responseData.eventClub,
      "Venue": responseData.eventVenue,
      "Time": responseData.eventTime
    }];
    const eventSheet = utils.json_to_sheet(eventData);
    utils.book_append_sheet(wb, eventSheet, "Event Details");
  
    // Format Teams Registered
    const teamsData = responseData.teamsRegistered?.map(team => ({
      "Team Name": team.teamName,
      "Leader Name": team.leaderName,
      "Leader Contact": team.leaderMobileNumber,
      "Roll Number": team.rollNumber
    })) || [];
    const teamsSheet = utils.json_to_sheet(teamsData);
    utils.book_append_sheet(wb, teamsSheet, "Teams Registered");
  
    // Format Registrars
    const registrarsData = responseData.eventRegistrarList?.map(registrar => ({
      "Participant Name": registrar.name,
      "Roll Number": registrar.rollNumber,
      "Contact Number": registrar.mobileNumber
    })) || [];
    const registrarsSheet = utils.json_to_sheet(registrarsData);
    utils.book_append_sheet(wb, registrarsSheet, "Registrars");
  
    // Save the Excel File
    writeFile(wb, "eventData.xlsx");
  };
  

  return (
    <div className="text-center mt-8">
      <button
        onClick={exportJSON}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
      >
        Export JSON
      </button>
      <button
        onClick={exportCSV}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2"
      >
        Export CSV
      </button>
      <button
        onClick={exportExcel}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-2"
      >
        Export Excel
      </button>
    </div>
  );
};

export default ExportData;
