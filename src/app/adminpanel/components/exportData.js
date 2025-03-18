import React, { useState } from "react";
import { saveAs } from "file-saver";
import { utils, writeFile } from "xlsx";
import { Parser } from "json2csv";
import { FileJson, FileText, FileSpreadsheet } from "lucide-react";

const ExportData = ({ responseData, isDataFetched }) => {
  const [hovered, setHovered] = useState("");

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

  const currentDateTime = new Date().toISOString().replace(/[:.]/g, "-");

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(displayedData, null, 2)], { type: "application/json" });
    saveAs(blob, `${responseData.eventName}_${currentDateTime}.json`);
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
    saveAs(blob, `${responseData.eventName}_${currentDateTime}.csv`);
  };

  const exportExcel = () => {
    const wb = utils.book_new();

    const eventSheet = utils.json_to_sheet([
      {
        "Event Name": responseData.eventName,
        Club: responseData.eventClub,
        Venue: responseData.eventVenue,
        Time: responseData.eventTime,
      },
    ]);
    utils.book_append_sheet(wb, eventSheet, "Event Details");

    const teamsSheet = utils.json_to_sheet(
      responseData.teamsRegistered?.map(team => ({
        "Team Name": team.teamName,
        "Leader Name": team.leaderName,
        "Leader Contact": team.leaderMobileNumber,
        "Roll Number": team.rollNumber,
      })) || []
    );
    utils.book_append_sheet(wb, teamsSheet, "Teams Registered");

    const registrarsSheet = utils.json_to_sheet(
      responseData.eventRegistrarList?.map(registrar => ({
        "Participant Name": registrar.name,
        "Roll Number": registrar.rollNumber,
        "Contact Number": registrar.mobileNumber,
      })) || []
    );
    utils.book_append_sheet(wb, registrarsSheet, "Registrars");

    writeFile(wb, `${responseData.eventName}_${currentDateTime}.xlsx`);
  };

  const colorClasses = {
    json: "bg-blue-500 lg:hover:bg-blue-700",
    csv: "bg-green-500 lg:hover:bg-green-700",
    excel: "bg-yellow-500 lg:hover:bg-yellow-700",
  };

  return (
    <div className="flex justify-end space-x-2 mt-5">
      <p className="mt-2">Export as:</p>
      {[
        { id: "json", label: "Export as JSON", icon: <FileJson className="w-6 h-6" />, action: exportJSON },
        { id: "csv", label: "Export as CSV", icon: <FileText className="w-6 h-6" />, action: exportCSV },
        { id: "excel", label: "Export as Excel", icon: <FileSpreadsheet className="w-6 h-6" />, action: exportExcel },
      ].map(({ id, label, icon, action }) => (
        <div key={id} className="flex flex-col items-center">
          <button
            onClick={action}
            className={`text-white font-bold py-2 px-4 rounded flex items-center space-x-2 transition-transform transform lg:hover:scale-105 ${colorClasses[id]}`}
          >
            {icon}
          </button>
          <span className={`text-sm text-gray-700 mt-2 opacity-100 lg:opacity-0 lg:hover:opacity-100 transition-opacity duration-300`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ExportData;
