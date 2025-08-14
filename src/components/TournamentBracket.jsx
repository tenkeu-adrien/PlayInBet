'use client'

import { FiTrello } from "react-icons/fi";

// import { FiTrophy } from 'react-icons/fi';

const TournamentBracket = ({ brackets }) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max py-4">
        {brackets.rounds.map((round, roundIndex) => (
          <div key={roundIndex} className="flex flex-col justify-around px-4">
            <h3 className="text-center font-medium mb-4">{round.name}</h3>
            <div className="space-y-6">
              {round.matches.map((match, matchIndex) => (
                <div key={matchIndex} className="relative">
                  <div className="bg-[#1f2937] rounded-lg p-3 min-w-[200px]">
                    <div className={`flex justify-between items-center mb-1 ${match.winner === match.player1 ? 'text-[#10b981]' : ''}`}>
                      <span>{match.player1}</span>
                      {match.winner === match.player1 && <FiTrello />}
                    </div>
                    <div className={`flex justify-between items-center ${match.winner === match.player2 ? 'text-[#10b981]' : ''}`}>
                      <span>{match.player2}</span>
                      {match.winner === match.player2 && <FiTrello />}
                    </div>
                  </div>
                  
                  {roundIndex > 0 && (
                    <>
                      <div className="absolute top-1/2 -left-4 w-4 h-px bg-white/20"></div>
                      {matchIndex % 2 === 0 && (
                        <div className="absolute top-1/2 -left-4 w-px h-12 bg-white/20"></div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentBracket;